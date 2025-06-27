import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Smartphone, CheckCircle, AlertCircle, Key } from 'lucide-react';

interface MFASetupProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

const MFASetup: React.FC<MFASetupProps> = ({ onComplete, onSkip }) => {
  const { enrollMFA, verifyMFA, user, loading } = useAuth();
  
  const [step, setStep] = useState<'intro' | 'verify' | 'complete'>('intro');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // MFA kurulumunu başlat
  const handleEnrollMFA = async () => {
    setError('');
    const result = await enrollMFA();
    
    if (result.success) {
      setStep('verify');
    } else {
      setError(result.error || 'MFA kurulumu başarısız');
    }
  };

  // Doğrulama kodunu kontrol et
  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('6 haneli doğrulama kodunu giriniz');
      return;
    }
    
    setError('');
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
  };

  // Intro step
  if (step === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Güvenlik Kurulumu</CardTitle>
            <CardDescription className="text-center">
              İki faktörlü kimlik doğrulama
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                İki Faktörlü Kimlik Doğrulama
              </h3>
              <p className="text-gray-600 mb-6">
                Hesabınızı daha güvenli hale getirmek için 2FA kurabilirsiniz.
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
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verify step
  if (step === 'verify') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Doğrulama Kodu</CardTitle>
            <CardDescription className="text-center">
              6 haneli doğrulama kodunu girin
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <Key className="h-12 w-12 text-blue-600 mx-auto mb-4" />
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
          </CardContent>
        </Card>
      </div>
    );
  }

  // Complete step
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-green-900">
            MFA Aktifleştirildi!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <div>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
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

          <Button onClick={onComplete} className="w-full">
            Tamamla
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MFASetup;