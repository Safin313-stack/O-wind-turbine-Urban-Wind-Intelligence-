import { useEffect } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { soundFx } from '../utils/audio';
import { NavPage } from '../types';

const PAGE_MAP: Record<string, NavPage> = {
  '1': 'dashboard',
  '2': 'live-turbine',
  '3': 'optimizer',
  '4': 'urban-wind',
  '5': 'energy',
  '6': 'air',
  '7': 'pollution-forecast',
  '8': 'analytics',
  '9': 'bangladesh-map',
};

export function useKeyboardShortcuts() {
  const {
    isPlaying,
    setIsPlaying,
    viewMode,
    setViewMode,
    setActivePage
  } = useTelemetry();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in text inputs or textareas
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === 'Space' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        soundFx.playClick();
        setIsPlaying(!isPlaying);
        return;
      }

      if (e.code === 'KeyL' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        soundFx.playClick();
        setViewMode(viewMode === 'app' ? 'landing' : 'app');
        return;
      }

      if (e.code === 'KeyM' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        soundFx.setMuted(!soundFx.getMuted());
        return;
      }

      if (PAGE_MAP[e.key]) {
        e.preventDefault();
        soundFx.playClick();
        setViewMode('app');
        setActivePage(PAGE_MAP[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isPlaying,
    setIsPlaying,
    viewMode,
    setViewMode,
    setActivePage
  ]);
}
