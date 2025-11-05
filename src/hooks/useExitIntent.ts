import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export function useExitIntentTracking() {
  useEffect(() => {
    let lastY = 0;
    let hasTriggered = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (hasTriggered) return;
      
      // Detect rapid upward movement near the top of the page
      if (e.clientY < 50 && e.clientY < lastY) {
        hasTriggered = true;
        analytics.exitIntent('mouse_leave_top');
      }
      
      lastY = e.clientY;
    };

    const handleVisibilityChange = () => {
      if (hasTriggered) return;
      
      if (document.visibilityState === 'hidden') {
        hasTriggered = true;
        analytics.exitIntent('tab_switch');
      }
    };

    const handleBeforeUnload = () => {
      if (!hasTriggered) {
        analytics.exitIntent('page_close');
      }
    };

    // Track mouse movement
    document.addEventListener('mousemove', handleMouseMove);
    
    // Track tab visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Track page unload
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}