import { useState, useEffect } from 'react';
import useFormStore from '../store/formStore';

const ENCRYPTION_KEY = 'lendswift-secret-key-2024';

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
    // useFormPersistence Hook
// Checks for saved drafts on page load
// Shows Resume/Start Fresh modal
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

const useFormPersistence = () => {
  const { updateStepData, setCurrentStep } = useFormStore();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [draftInfo, setDraftInfo] = useState(null);
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    checkForSavedDraft();
  }, []);

  const checkForSavedDraft = async () => {
    const loanTypes = ['Personal', 'Home', 'Business', 'unknown'];
    
    for (const type of loanTypes) {
      const key = `lendswift_draft_${type}`;
      const metaKey = `lendswift_meta_${type}`;
      const encrypted = localStorage.getItem(key);
      const meta = JSON.parse(localStorage.getItem(metaKey) || '{}');

      if (encrypted && meta.timestamp) {
        // 72 hours check
        const savedTime = new Date(meta.timestamp);
        const hoursDiff = (new Date() - savedTime) / (1000 * 60 * 60);
        
        if (hoursDiff > 72) {
          localStorage.removeItem(key);
          localStorage.removeItem(metaKey);
          continue;
        }

        const decrypted = await decrypt(encrypted);
        if (decrypted) {
          setSavedData(JSON.parse(decrypted));
          setDraftInfo(meta);
          setShowResumeModal(true);
          break;
        }
      }
    }
  };

  const handleResume = () => {
    if (savedData) {
      // सभी steps का data restore करें
      Object.keys(savedData).forEach((step) => {
        updateStepData(step, savedData[step]);
      });
      setCurrentStep(draftInfo.step || 1);
    }
    setShowResumeModal(false);
  };

  const handleStartFresh = () => {
    // सभी drafts clear करें
    const allTypes = ['Personal', 'Home', 'Business', 'unknown'];
    allTypes.forEach((type) => {
      localStorage.removeItem(`lendswift_draft_${type}`);
      localStorage.removeItem(`lendswift_meta_${type}`);
    });
    setShowResumeModal(false);
  };

  return { showResumeModal, draftInfo, handleResume, handleStartFresh };
};

export default useFormPersistence;