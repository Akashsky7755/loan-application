// Encryption Utility
// AES-256-GCM encryption via Web Crypto API
// Used for LocalStorage auto-save security

const ENCRYPTION_KEY = 'lendswift-secret-key-2024';

export const encrypt = async (text) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const keyData = encoder.encode(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));

  const key = await window.crypto.subtle.importKey(
    'raw', keyData, { name: 'AES-GCM' }, false, ['encrypt']
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, key, data
  );

  return JSON.stringify({
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  });
};

export const decrypt = async (encryptedText) => {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32));

    const key = await window.crypto.subtle.importKey(
      'raw', keyData, { name: 'AES-GCM' }, false, ['decrypt']
    );

    const { iv, data } = JSON.parse(encryptedText);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(iv) }, key, new Uint8Array(data)
    );

    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
};