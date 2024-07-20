// src/usePWAInstallPrompt.ts
import { useState, useEffect } from "react";

const usePWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPromptVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then(
        (choiceResult: { outcome: string }) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          setDeferredPrompt(null);
          setIsPromptVisible(false);
        }
      );
    }
  };
  const Onclose = () => {
    setIsPromptVisible(false);
  };
  return {
    isPromptVisible,
    handleInstallClick,
    Onclose,
  };
};

export default usePWAInstallPrompt;
