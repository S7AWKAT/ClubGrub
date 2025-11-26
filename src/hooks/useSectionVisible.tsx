import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

// Hook: observe an element by id and fire analytics.sectionVisible when visible
export function useSectionVisible(id: string) {
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          analytics.sectionVisible(id);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(element);

    return () => observer.disconnect();
  }, [id]);
}

export default useSectionVisible;
