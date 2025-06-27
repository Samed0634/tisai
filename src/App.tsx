import React from 'react';
import { useAuth } from './hooks/useAuth';
import SecureLogin from './components/auth/SecureLogin';

function App() {
  const { user, signOut, loading, error } = useAuth();

  // Console'a debug bilgileri yazdır
  console.log('=== DEBUG INFO ===');
  console.log('User:', user);
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('==================');

  // Loading durumu
  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Yükleniyor...</h2>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
        <h2>Hata: {error}</h2>
        <button onClick={() => window.location.reload()}>
          Yeniden Yükle
        </button>
      </div>
    );
  }

  // Kullanıcı yoksa login göster
  if (!user) {
    console.log('DEBUG - Showing login because user is null');
    return <SecureLogin />;
  }

  // Kullanıcı varsa ana sayfa
  console.log('DEBUG - Showing main app because user exists:', user);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {/* Başarı mesajı */}
      <div style={{ 
        backgroundColor: '#d4edda', 
        color: '#155724',
        padding: '15px', 
        marginBottom: '20px',
        border: '1px solid #c3e6cb',
        borderRadius: '5px'
      }}>
        <strong>🎉 GİRİŞ BAŞARILI!</strong> TisAI'ye hoş geldiniz!
      </div>
      
      {/* Header */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        marginBottom: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '5px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#495057' }}>🛡️ TisAI Dashboard</h1>
        <p style={{ margin: '0', color: '#6c757d' }}>Güvenli uygulama ortamınız</p>
      </div>

      {/* Kullanıcı Bilgileri */}
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        marginBottom: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '5px'
      }}>
        <h3 style={{ marginTop: '0', color: '#495057' }}>👤 Kullanıcı Bilgileri</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Kullanıcı ID:</strong> {user.id}</p>
        <p><strong>Email Doğrulandı:</strong> {user.email_confirmed_at ? '✅ Evet' : '❌ Hayır'}</p>
        <p><strong>Son Giriş:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('tr-TR') : 'İlk giriş'}</p>
      </div>

      {/* Ana İçerik */}
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        marginBottom: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '5px'
      }}>
        <h3 style={{ marginTop: '0', color: '#495057' }}>📊 Dashboard</h3>
        <p>Artık güvenli bir şekilde uygulamanızı kullanabilirsiniz!</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>🔐 Güvenlik</h4>
            <p style={{ margin: '0', fontSize: '14px' }}>2FA aktif değil</p>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#f3e5f5', borderRadius: '5px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>📈 İstatistikler</h4>
            <p style={{ margin: '0', fontSize: '14px' }}>Veriler yükleniyor...</p>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '5px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>⚙️ Ayarlar</h4>
            <p style={{ margin: '0', fontSize: '14px' }}>Profil ayarları</p>
          </div>
        </div>
      </div>

      {/* Çıkış Butonu */}
      <button 
        onClick={async () => {
          console.log('Signing out...');
          await signOut();
        }}
        style={{ 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none',
          padding: '12px 24px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        🚪 Çıkış Yap
      </button>
    </div>
  );
}

export default App;