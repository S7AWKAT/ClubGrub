import { useEffect, useCallback } from 'react';

// Track scroll depth with throttling
let lastScrollDepth = 0;
let scrollTimeout: number | null = null;

function getScrollDepth(): number {
  const h = document.documentElement;
  const b = document.body;
  const st = 'scrollTop';
  const sh = 'scrollHeight';
  
  const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
  return Math.round(percent);
}

export function useScrollDepthTracking() {
  const trackScrollDepth = useCallback(() => {
    if (scrollTimeout) {
      window.clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = window.setTimeout(() => {
      const depth = getScrollDepth();
      if (Math.abs(depth - lastScrollDepth) >= 10) { // Track every 10% change
        lastScrollDepth = depth;
        try {
          const sl = (window as any).smartlook;
          if (sl) {
            sl('track', 'scroll_depth', { depth });
          }
        } catch (e) {
          // noop
        }
      }
    }, 500) as unknown as number;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', trackScrollDepth);
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, [trackScrollDepth]);
}

// Track time spent on page/section
export function useTimeSpentTracking() {
  useEffect(() => {
    const startTime = Date.now();
    let lastTrack = startTime;
    
    const interval = setInterval(() => {
      const now = Date.now();
      const totalSeconds = Math.floor((now - startTime) / 1000);
      const intervalSeconds = Math.floor((now - lastTrack) / 1000);
      
      if (intervalSeconds >= 30) { // Track every 30 seconds
        lastTrack = now;
        try {
          const sl = (window as any).smartlook;
          if (sl) {
            sl('track', 'time_spent', { 
              total_seconds: totalSeconds,
              interval_seconds: intervalSeconds
            });
          }
        } catch (e) {
          // noop
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);
}

// Mouse movement heat tracking
export function useMouseTrackingHook() {
  useEffect(() => {
    let lastTrack = Date.now();
    const moveHandler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTrack > 1000) { // Throttle to once per second
        lastTrack = now;
        try {
          const sl = (window as any).smartlook;
          if (sl) {
            sl('track', 'mouse_position', {
              x: e.clientX,
              y: e.clientY,
              element: (e.target as HTMLElement).tagName,
              section: (e.target as HTMLElement).closest('section')?.id || 'unknown'
            });
          }
        } catch (e) {
          // noop
        }
      }
    };

    window.addEventListener('mousemove', moveHandler);
    return () => window.removeEventListener('mousemove', moveHandler);
  }, []);
}