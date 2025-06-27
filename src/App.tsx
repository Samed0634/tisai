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

  // DEBUG: Console'a yazdır
  console.log('DEBUG - App State:', { user, loading, error });
  console.log('DEBUG - User object:', user);

  // Loading state
  if (loading) {
    console.log('DEBUG - Loading state active');
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
    console.log('DEBUG - Error state:', error);
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
    console.log('DEBUG - No user, showing login');
    return <SecureLogin />;
  }

  // DEBUG: User var, ana uygulamayı göster
  console.log('DEBUG - User found, showing main app');

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
      {/* DEBUG INFO */}
      <div className="bg-green-100 p-2 text-center text-sm">
        <strong>DEBUG:</strong> Giriş başarılı! User: {user.email}
      </div>

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