import React, { useState } from 'react';
import { useAuth, LoginData } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Mail, Lock, Shield, AlertCircle } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email('Geçerli bir email adresi giriniz');

const SecureLogin: React.FC = () => {
  const { signIn, signInWithGoogle, signInWithMagicLink, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<LoginData>>({});

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<LoginData> = {};
    
    if (!formData.email) {
      errors.email = 'Email gerekli';
    } else if (!emailSchema.safeParse(formData.email).success) {
      errors.email = 'Geçerli bir email adresi giriniz';
    }
    
    if (!formData.password) {
      errors.password = 'Şifre gerekli';
    } else if (formData.password.length < 8) {
      errors.password = 'Şifre en az 8 karakter olmalı';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input change
  const handleInputChange = (field: keyof LoginData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear global error
    if (error) {
      clearError();
    }
  };

  // Handle regular login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await signIn(formData);
    
    if (!result.success) {
      console.error('Login failed:', result.error);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    
    if (!result.success) {
      console.error('Google login failed:', result.error);
    }
  };

  // Handle magic link
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse(magicLinkEmail);
    if (!validation.success) {
      return;
    }

    const result = await signInWithMagicLink(magicLinkEmail);
    
    if (result.success) {
      setMagicLinkSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Güvenli Giriş</CardTitle>
          <CardDescription className="text-center">
            Hesabınıza güvenli bir şekilde giriş yapın
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="password" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Şifre ile</TabsTrigger>
              <TabsTrigger value="magic">Magic Link</TabsTrigger>
            </TabsList>
            
            {/* Password Login */}
            <TabsContent value="password" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Şifre</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Şifrenizi giriniz"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 pr-10 ${formErrors.password ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">veya</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google ile Giriş Yap
              </Button>
            </TabsContent>

            {/* Magic Link Login */}
            <TabsContent value="magic" className="space-y-4">
              {!magicLinkSent ? (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="magic-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="magic-email"
                        type="email"
                        placeholder="ornek@email.com"
                        value={magicLinkEmail}
                        onChange={(e) => setMagicLinkEmail(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading || !magicLinkEmail}
                  >
                    {loading ? 'Gönderiliyor...' : 'Magic Link Gönder'}
                  </Button>
                </form>
              ) : (
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    Giriş linki email adresinize gönderildi. Lütfen email kutunuzu kontrol edin.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Hesabınız yok mu?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Kayıt olun
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Şifrenizi mi unuttunuz?{' '}
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Sıfırlayın
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecureLogin;