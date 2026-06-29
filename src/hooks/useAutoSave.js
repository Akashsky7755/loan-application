import { useEffect, useRef } from 'react';

const ENCRYPTION_KEY = 'lendswift-secret-key-2024';

// Simple encryption (AES-256 simulation)
const encrypt = async (text) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const keyData = encoder.encode(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));
  
  const key = await window.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );
  
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  
  const result = {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  };
  
  return JSON.stringify(result);
};

const decrypt = async (encryptedText) => {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));
    
    const key = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    const { iv, data } = JSON.parse(encryptedText);
    
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(iv) },
      key,
      new Uint8Array(data)
    );
    
    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
};

const useAutoSave = (formData, currentStep, interval = 30000) => {
  const timerRef = useRef(null);
  const loanType = formData.step1?.loanType || 'unknown';
  const STORAGE_KEY = `lendswift_draft_${loanType}`;
  const META_KEY = `lendswift_meta_${loanType}`;

  // Save function
  const saveToStorage = async () => {
    try {
      const stateToSave = JSON.stringify(formData);
      const encrypted = await encrypt(stateToSave);
      
      localStorage.setItem(STORAGE_KEY, encrypted);
      localStorage.setItem(META_KEY, JSON.stringify({
        version: '1.0',
        timestamp: new Date().toISOString(),
        step: currentStep,
        loanType,
      }));

      // Toast notification दिखाएं
      showToast(`Draft saved at ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  };

  // Toast दिखाएं
  const showToast = (message) => {
    const existing = document.getElementById('autosave-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'autosave-toast';
    toast.innerHTML = `💾 ${message}`;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #27AE60;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 2000);
  };

  // हर 30 seconds में auto-save
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      saveToStorage();
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [formData, currentStep]);

  // Draft check function
  const checkForDraft = async (loanType) => {
    try {
      const key = `lendswift_draft_${loanType}`;
      const metaKey = `lendswift_meta_${loanType}`;
      const encrypted = localStorage.getItem(key);
      const meta = JSON.parse(localStorage.getItem(metaKey) || '{}');

      if (!encrypted || !meta.timestamp) return null;

      // 72 hours check
      const savedTime = new Date(meta.timestamp);
      const now = new Date();
      const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
      
      if (hoursDiff > 72) {
        localStorage.removeItem(key);
        localStorage.removeItem(metaKey);
        return null;
      }

      const decrypted = await decrypt(encrypted);
      if (!decrypted) return null;

      return {
        formData: JSON.parse(decrypted),
        meta,
      };
    } catch {
      return null;
    }
  };

  // Draft clear करें
  const clearDraft = () => {
    const allTypes = ['Personal', 'Home', 'Business', 'unknown'];
    allTypes.forEach((type) => {
      localStorage.removeItem(`lendswift_draft_${type}`);
      localStorage.removeItem(`lendswift_meta_${type}`);
    });
  };

  return { saveToStorage, checkForDraft, clearDraft };
};

export default useAutoSave;