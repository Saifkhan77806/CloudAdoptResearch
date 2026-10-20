'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    const iosStandalone = 'standalone' in window.navigator && window.navigator.standalone;
    setInstalled(standalone || Boolean(iosStandalone));

    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    }

    function onInstalled() {
      setInstalled(true);
      setInstallPrompt(null);
      setShowInstructions(false);
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    if ('serviceWorker' in navigator && window.isSecureContext) {
      void navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) return null;

  async function installApp() {
    if (!installPrompt) {
      setShowInstructions((visible) => !visible);
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    if (choice.outcome === 'accepted') setInstalled(true);
    else setShowInstructions(true);
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        className="min-h-11 gap-2 border-teal-800 text-teal-950 hover:bg-teal-50"
        onClick={installApp}
        aria-expanded={showInstructions}
        aria-controls="install-app-help"
      >
        <Download aria-hidden="true" className="h-4 w-4" />
        Install app
      </Button>
      {showInstructions && (
        <div
          id="install-app-help"
          className="absolute right-0 top-full z-[60] mt-2 w-[min(19rem,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-800 shadow-lg"
          role="status"
        >
          <p className="font-semibold text-slate-950">Add Swasthya Connect to your device</p>
          <p className="mt-2">In your browser menu, choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</p>
          <p className="mt-2">On iPhone or iPad, tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</p>
        </div>
      )}
    </div>
  );
}
