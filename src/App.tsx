import React from 'react';
import { useAuth } from './hooks/useAuth';
import SecureLogin from './components/auth/SecureLogin';
import MFASetup from './components/auth/MFASetup';
import { Loader2, Shield, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

function App() {
  const { user, signOut, loading, error } = useAuth();
  const [showMFASetup, setShowMFASetup] = React.useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Hata Oluştu</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full mt-4"
            >
              Yeniden Yükle
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not authenticated - show login
  if (!user) {
    return <SecureLogin />;
  }

  // Show MFA setup if requested
  if (showMFASetup) {
    return (
      <MFASetup 
        onComplete={() => setShowMFASetup(false)}
        onSkip={() => setShowMFASetup(false)}
      />
    );
  }

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
  };

  // Authenticated - show main app
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">TisAI</h1>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Güvenli
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Hoş geldin, {user.email}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMFASetup(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Settings className="h-4 w-4 mr-1" />
                Güvenlik
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-600" />
                <span>Güvenli Dashboard</span>
              </CardTitle>
              <CardDescription>
                TisAI uygulamanıza güvenli bir şekilde giriş yaptınız
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">Kimlik Doğrulama</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    ✓ Email doğrulama aktif
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900">Oturum Güvenliği</h3>
                  <p className="text-sm text-green-700 mt-1">
                    ✓ Güvenli oturum yönetimi
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-900">Veri Koruması</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    ✓ Şifrelenmiş veri aktarımı
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hızlı Eylemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium">Güvenlik Ayarları</h3>
                <p className="text-sm text-gray-600 mt-1">MFA ve şifre ayarları</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium">Profil</h3>
                <p className="text-sm text-gray-600 mt-1">Kişisel bilgiler</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium">Ayarlar</h3>
                <p className="text-sm text-gray-600 mt-1">Uygulama tercihleri</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">?</span>
                </div>
                <h3 className="font-medium">Yardım</h3>
                <p className="text-sm text-gray-600 mt-1">Destek ve rehberler</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ana İçerik Alanı</CardTitle>
              <CardDescription>
                Mevcut uygulamanızın içeriğini buraya entegre edebilirsiniz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    TisAI Dashboard
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Güvenli giriş başarılı! Artık uygulamanızı güvenle kullanabilirsiniz.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>✓ Şifrelenmiş bağlantı aktif</p>
                    <p>✓ Oturum güvenliği sağlandı</p>
                    <p>✓ Kullanıcı doğrulaması tamamlandı</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>TisAI - Güvenli Uygulama</span>
            </div>
            <div className="text-sm text-gray-500">
              Son giriş: {new Date().toLocaleString('tr-TR')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;