import React from 'react';
import { useAuth } from './hooks/useAuth';

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
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Giriş Yapın</h2>
        <p>Login ekranına yönlendiriliyorsunuz...</p>
        <div>
          <input type="email" placeholder="Email" id="email" />
          <input type="password" placeholder="Şifre" id="password" />
          <button onClick={async () => {
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            console.log('Login attempt:', email, password);
          }}>
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  // Kullanıcı varsa ana sayfa
  return (
    <div style={{ padding: '50px' }}>
      <div style={{ backgroundColor: 'lightgreen', padding: '10px', marginBottom: '20px' }}>
        <strong>✅ GİRİŞ BAŞARILI!</strong>
      </div>
      
      <h1>TisAI Dashboard</h1>
      <p><strong>Kullanıcı:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email Doğrulandı:</strong> {user.email_confirmed_at ? 'Evet' : 'Hayır'}</p>
      
      <button 
        onClick={signOut}
        style={{ 
          backgroundColor: 'red', 
          color: 'white', 
          padding: '10px 20px',
          marginTop: '20px'
        }}
      >
        Çıkış Yap
      </button>
    </div>
  );
}

export default App;