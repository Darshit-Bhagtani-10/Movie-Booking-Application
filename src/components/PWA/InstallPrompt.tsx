
import React, { useEffect, useState } from 'react';

export const InstallPrompt: React.FC = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-20 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
    >
      Install App
    </button>
  );
};