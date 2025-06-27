// ==============================================================================
// Security Utility Functions
// ==============================================================================

import { z } from 'zod';
import bcrypt from 'bcryptjs';

// ==============================================================================
// Input Validation Schemas
// ==============================================================================

export const emailSchema = z
  .string()
  .email('Geçerli bir email adresi giriniz')
  .min(5, 'Email en az 5 karakter olmalı')
  .max(254, 'Email çok uzun');

export const passwordSchema = z
  .string()
  .min(8, 'Şifre en az 8 karakter olmalı')
  .max(128, 'Şifre çok uzun')
  .regex(/^(?=.*[a-z])/, 'En az bir küçük harf içermeli')
  .regex(/^(?=.*[A-Z])/, 'En az bir büyük harf içermeli')
  .regex(/^(?=.*\d)/, 'En az bir rakam içermeli')
  .regex(/^(?=.*[@$!%*?&])/, 'En az bir özel karakter (@$!%*?&) içermeli');

export const nameSchema = z
  .string()
  .min(2, 'İsim en az 2 karakter olmalı')
  .max(50, 'İsim çok uzun')
  .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Sadece harf ve boşluk kullanabilirsiniz');

export const urlSchema = z
  .string()
  .url('Geçerli bir URL giriniz')
  .max(2048, 'URL çok uzun');

// Content validation
export const contentSchema = z
  .string()
  .min(1, 'İçerik boş olamaz')
  .max(10000, 'İçerik çok uzun')
  .refine((content) => !isSpamContent(content), {
    message: 'İçerik spam olarak algılandı',
  });

// ==============================================================================
// Input Sanitization
// ==============================================================================

/**
 * HTML içeriğini temizler ve XSS saldırılarını önler
 */
export const sanitizeHtml = (input: string): string => {
  if (!input) return '';
  
  // Tehlikeli HTML tag'lerini kaldır
  const dangerousTags = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  let cleaned = input.replace(dangerousTags, '');
  
  // Diğer tehlikeli elementleri kaldır
  const dangerousPatterns = [
    /<iframe\b[^>]*>/gi,
    /<object\b[^>]*>/gi,
    /<embed\b[^>]*>/gi,
    /<form\b[^>]*>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick, onload vs.
  ];
  
  dangerousPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });
  
  return cleaned.trim();
};

/**
 * SQL injection'ı önlemek için string'i temizler
 */
export const sanitizeSql = (input: string): string => {
  if (!input) return '';
  
  // SQL keywords ve özel karakterleri escape et
  return input
    .replace(/'/g, "''") // Single quote escape
    .replace(/;/g, '') // Semicolon kaldır
    .replace(/--/g, '') // SQL comment kaldır
    .replace(/\/\*/g, '') // Multi-line comment başlangıcı
    .replace(/\*\//g, '') // Multi-line comment bitişi
    .trim();
};

/**
 * XSS saldırılarını önlemek için özel karakterleri encode eder
 */
export const escapeHtml = (input: string): string => {
  if (!input) return '';
  
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (char) => escapeMap[char] || char);
};

// ==============================================================================
// Password Security
// ==============================================================================

/**
 * Şifreyi güvenli şekilde hash'ler
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = parseInt(import.meta.env.VITE_BCRYPT_ROUNDS || '12');
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Şifre doğrulama
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Şifre gücünü kontrol eder
 */
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;
  
  // Uzunluk kontrolü
  if (password.length >= 8) score += 1;
  else feedback.push('En az 8 karakter olmalı');
  
  if (password.length >= 12) score += 1;
  
  // Karakter çeşitliliği
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Küçük harf ekleyin');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Büyük harf ekleyin');
  
  if (/\d/.test(password)) score += 1;
  else feedback.push('Rakam ekleyin');
  
  if (/[@$!%*?&]/.test(password)) score += 1;
  else feedback.push('Özel karakter ekleyin');
  
  // Yaygın şifreleri kontrol et
  const commonPasswords = [
    '12345678', 'password', '123456789', 'qwerty',
    'abc123', 'password123', '12345', 'admin'
  ];
  
  if (commonPasswords.includes(password.toLowerCase())) {
    score = Math.max(0, score - 2);
    feedback.push('Çok yaygın bir şifre kullanıyorsunuz');
  }
  
  return { score, feedback };
};

// ==============================================================================
// Rate Limiting
// ==============================================================================

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const key = `${identifier}`;
    
    // Clean expired entries
    if (this.store[key] && now > this.store[key].resetTime) {
      delete this.store[key];
    }
    
    // Initialize or increment counter
    if (!this.store[key]) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return true;
    }
    
    this.store[key].count++;
    return this.store[key].count <= this.maxRequests;
  }

  getRemainingRequests(identifier: string): number {
    const entry = this.store[identifier];
    if (!entry) return this.maxRequests;
    
    return Math.max(0, this.maxRequests - entry.count);
  }

  getResetTime(identifier: string): number {
    const entry = this.store[identifier];
    return entry ? entry.resetTime : Date.now();
  }
}

export const rateLimiter = new RateLimiter();

// ==============================================================================
// Content Security
// ==============================================================================

/**
 * Spam içerik tespiti
 */
export const isSpamContent = (content: string): boolean => {
  if (!content || content.length < 3) return true;
  
  const spamPatterns = [
    /\b(spam|click here|buy now|free money|win money|lottery|viagra|casino)\b/gi,
    /\b(limited time|act now|order now|call now|don't wait)\b/gi,
    /\$+\d+/g, // Para sembolleri
    /http[s]?:\/\/[^\s]+/g, // Çok fazla link
  ];
  
  let spamScore = 0;
  
  spamPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      spamScore += matches.length;
    }
  });
  
  // Tekrarlanan karakterler
  if (/(.)\1{4,}/g.test(content)) spamScore += 2;
  
  // Çok fazla büyük harf
  const upperCaseRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (upperCaseRatio > 0.5) spamScore += 2;
  
  return spamScore >= 3;
};

/**
 * Profanity (küfür) tespiti
 */
export const containsProfanity = (content: string): boolean => {
  // Türkçe küfürler için basit bir liste (gerçek uygulamada daha kapsamlı olmalı)
  const profanityWords = [
    // Bu liste daha kapsamlı olmalı
    'küfür1', 'küfür2', // Gerçek kelimeleri ekleyin
  ];
  
  const lowercaseContent = content.toLowerCase();
  
  return profanityWords.some(word => 
    lowercaseContent.includes(word.toLowerCase())
  );
};

// ==============================================================================
// CSRF Protection
// ==============================================================================

/**
 * CSRF token oluşturur
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * CSRF token doğrulama
 */
export const verifyCSRFToken = (token: string, expectedToken: string): boolean => {
  if (!token || !expectedToken) return false;
  return token === expectedToken;
};

// ==============================================================================
// Validation Helpers
// ==============================================================================

/**
 * Email formatını doğrular
 */
export const isValidEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

/**
 * Şifre formatını doğrular
 */
export const isValidPassword = (password: string): boolean => {
  return passwordSchema.safeParse(password).success;
};

/**
 * URL formatını doğrular
 */
export const isValidUrl = (url: string): boolean => {
  return urlSchema.safeParse(url).success;
};

// ==============================================================================
// Error Handling
// ==============================================================================

/**
 * Güvenli hata mesajları
 */
export const getSecureErrorMessage = (error: any): string => {
  // Production'da detaylı hata mesajlarını gizle
  if (import.meta.env.VITE_APP_ENV === 'production') {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Email veya şifre hatalı';
      case 'auth/too-many-requests':
        return 'Çok fazla deneme yaptınız. Lütfen bekleyiniz.';
      case 'auth/email-already-in-use':
        return 'Bu email adresi zaten kullanımda';
      case 'auth/weak-password':
        return 'Şifre çok zayıf';
      case 'auth/invalid-email':
        return 'Geçersiz email adresi';
      default:
        return 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
    }
  }
  
  // Development'ta detaylı hataları göster
  return error.message || 'Bilinmeyen hata';
};

// ==============================================================================
// Export all utilities
// ==============================================================================

export const SecurityUtils = {
  // Validation
  emailSchema,
  passwordSchema,
  nameSchema,
  urlSchema,
  contentSchema,
  isValidEmail,
  isValidPassword,
  isValidUrl,
  
  // Sanitization
  sanitizeHtml,
  sanitizeSql,
  escapeHtml,
  
  // Password
  hashPassword,
  verifyPassword,
  checkPasswordStrength,
  
  // Rate Limiting
  rateLimiter,
  
  // Content Security
  isSpamContent,
  containsProfanity,
  
  // CSRF
  generateCSRFToken,
  verifyCSRFToken,
  
  // Error Handling
  getSecureErrorMessage,
};