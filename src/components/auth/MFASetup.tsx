import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Smartphone, QrCode, Copy, CheckCircle, AlertCircle, Key } from 'lucide-react';

interface MFASetupProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

const MFASetup: React.FC<MFASetupProps> = ({ onComplete, onSkip }) => {
  const { enrollMFA, verifyMFA, user, loading } = useAuth();
  
  const [step, setStep] = useState<'intro' | 'setup' | 'verify' | 'complete'>('intro');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // QR kodu oluştur (basit bir placeholder - gerçekte API'den gelecek)
  const generateQRCode = async (qrCodeData: string) => {
    try {
      // Bu basit bir placeholder. Gerçek uygulamada qrcode library kullanın
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 256;
      
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#000000';
        ctx.font = '12px Arial';
        ctx.fillText('QR Code Placeholder', 80, 128);
        ctx.fillText('Use authenticator app', 70, 150);
        
        setQrCodeUrl(canvas.toDataURL());
      }
    } catch (error) {
      console.error('QR kod oluşturulamadı:', error);
      setError('QR kod oluşturulamadı');
    }
  };

  // MFA kurulumunu başlat
  const handleEnrollMFA = async () => {
    setError('');
    setStep('setup');
    
    try {
      const result = await enrollMFA();
      
      if (result.success && result.qrCode) {
        await generateQRCode(result.qrCode);
        
        // Simulated backup codes (gerçek uygulamada API'den gelecek)
        const codes = Array.from({ length: 8 }, () => 
          Math.random().toString(36).substring(2, 8).toUpperCase()
        );
        setBackupCodes(codes);
        
        setStep('verify');
      } else {
        setError(result.error || 'MFA kurulumu başarısız');
        setStep('intro');
      }
    } catch (error) {
      setError('MFA kurulumu sırasında hata oluştu');
      setStep('intro');
    }
  };

  // Doğrulama kodunu kontrol et
  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('6 haneli doğrulama kodunu giriniz');
      return;
    }
    
    setError('');
    
    try {
      const result = await verifyMFA(verificationCode);
      
      if (result.success) {
        setSuccess('MFA başarıyla aktifleştirildi!');
        setStep('complete');
        
        setTimeout(() => {
          onComplete?.();
        }, 2000);
      } else {
        setError(result.error || 'Doğrulama kodu hatalı');
      }
    } catch (error) {
      setError('Doğrulama sırasında hata oluştu');
    }
  };

  // Backup kodları kopyala
  const copyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText).then(() => {
      setSuccess('Backup kodları kopyalandı');
      setTimeout(() => setSuccess(''), 3000);
    });
  };

  // Intro step
  const renderIntroStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          İki Faktörlü Kimlik Doğrulama
        </h3>
        <p className="text-gray-600 mb-6">
          Hesabınızı daha güvenli hale getirmek için iki faktörlü kimlik doğrulama (2FA) kurabilirsiniz.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900">Ek Güvenlik</h4>
            <p className="text-sm text-green-700">
              Şifrenizin çalınması durumunda bile hesabınız güvende kalır
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
          <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Mobil Uygulama</h4>
            <p className="text-sm text-blue-700">
              Google Authenticator, Authy veya benzeri uygulamalar gerekli
            </p>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex space-x-3">
        <Button 
          onClick={handleEnrollMFA} 
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Hazırlanıyor...' : 'Kuruluma Başla'}
        </Button>
        
        {onSkip && (
          <Button 
            variant="outline" 
            onClick={onSkip}
            className="flex-1"
          >
            Şimdilik Atla
          </Button>
        )}
      </div>
    </div>
  );

  // Setup step
  const renderSetupStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <QrCode className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">QR Kodu Tarayın</h3>
        <p className="text-gray-600">
          Authenticator uygulamanızla QR kodu tarayın veya manuel olarak kodu girin
        </p>
      </div>

      {qrCodeUrl && (
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Manuel Kurulum</h4>
          <p className="text-sm text-gray-600 mb-2">
            QR kodu tarayamıyorsanız bu kodu manuel olarak girebilirsiniz:
          </p>
          <div className="flex items-center space-x-2">
            <code className="flex-1 p-2 bg-white rounded border text-sm">
              {user?.email} - ABCD1234EFGH5678
            </code>
            <Button size="sm" variant="outline">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Alert>
          <Smartphone className="h-4 w-4" />
          <AlertDescription>
            <strong>Önerilen Uygulamalar:</strong> Google Authenticator, Microsoft Authenticator, Authy
          </AlertDescription>
        </Alert>
      </div>

      <Button 
        onClick={() => setStep('verify')} 
        className="w-full"
      >
        Devam Et
      </Button>
    </div>
  );

  // Verify step
  const renderVerifyStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Key className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Doğrulama Kodu</h3>
        <p className="text-gray-600">
          Authenticator uygulamanızdan 6 haneli kodu girin
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="verification-code">Doğrulama Kodu</Label>
          <Input
            id="verification-code"
            type="text"
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setVerificationCode(value);
              setError('');
            }}
            className={`text-center text-2xl tracking-widest ${error ? 'border-red-500' : ''}`}
            maxLength={6}
          />
          {error && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}
        </div>

        <Button 
          onClick={handleVerifyCode}
          disabled={loading || verificationCode.length !== 6}
          className="w-full"
        >
          {loading ? 'Doğrulanıyor...' : 'Doğrula'}
        </Button>
      </div>

      {backupCodes.length > 0 && (
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Önemli:</strong> Backup kodlarınızı güvenli bir yerde saklayın. 
              Telefonunuzu kaybettiğinizde bu kodlarla giriş yapabilirsiniz.
            </AlertDescription>
          </Alert>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-yellow-900">Backup Kodları</h4>
              <Button size="sm" variant="outline" onClick={copyBackupCodes}>
                <Copy className="h-4 w-4 mr-1" />
                Kopyala
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              {backupCodes.map((code, index) => (
                <div key={index} className="p-2 bg-white rounded border">
                  {code}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Complete step
  const renderCompleteStep = () => (
    <div className="space-y-6 text-center">
      <div>
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2 text-green-900">
          MFA Başarıyla Aktifleştirildi!
        </h3>
        <p className="text-gray-600">
          Hesabınız artık iki faktörlü kimlik doğrulama ile korunuyor.
        </p>
      </div>

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        <p>✓ Backup kodlarınızı güvenli bir yerde sakladığınızdan emin olun</p>
        <p>✓ Bir sonraki girişinizde authenticator uygulamanızı kullanacaksınız</p>
        <p>✓ MFA ayarlarını istediğiniz zaman değiştirebilirsiniz</p>
      </div>

      <Button onClick={onComplete} className="w-full">
        Tamamla
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">
            Güvenlik Kurulumu
          </CardTitle>
          <CardDescription className="text-center">
            Adım {step === 'intro' ? '1' : step === 'setup' ? '2' : step === 'verify' ? '3' : '4'} / 4
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 'intro' && renderIntroStep()}
          {step === 'setup' && renderSetupStep()}
          {step === 'verify' && renderVerifyStep()}
          {step === 'complete' && renderCompleteStep()}
        </CardContent>
      </Card>
    </div>
  );
};

// MFA Verification Modal (giriş sırasında kullanılacak)
interface MFAVerificationModalProps {
  isOpen: boolean;
  onVerify: (code: string) => Promise<{ success: boolean; error?: string }>;
  onClose: () => void;
  onUseBackupCode: () => void;
}

export const MFAVerificationModal: React.FC<MFAVerificationModalProps> = ({
  isOpen,
  onVerify,
  onClose,
  onUseBackupCode
}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('6 haneli kodu giriniz');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await onVerify(code);
      
      if (!result.success) {
        setError(result.error || 'Doğrulama başarısız');
      }
    } catch (error) {
      setError('Doğrulama sırasında hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-center">
            İki Faktörlü Doğrulama
          </CardTitle>
          <CardDescription className="text-center">
            Authenticator uygulamanızdan 6 haneli kodu girin
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mfa-code">Doğrulama Kodu</Label>
<Input
  id="mfa-code"
  type="text"
  placeholder="123456"
  value={code}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setError('');
  }}
  className={`text-center text-2xl tracking-widest ${error ? 'border-red-500' : ''}`}
  maxLength={6}
  autoFocus
/>