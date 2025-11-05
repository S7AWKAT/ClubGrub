import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Call this hook inside a Router context to emit virtual pageviews to Smartlook
 * whenever the route changes.
 */
export default function useSmartlookPageViews() {
  const location = useLocation();

  useEffect(() => {
    try {
      const sl = (window as any).smartlook;
      if (!sl) return;

      // Tag a virtual pageview — using both tag and track for compatibility
      try {
        sl('tag', 'pageview', { path: location.pathname + location.search });
      } catch (e) {
        // ignore
      }
      try {
        sl('track', 'page_view', { path: location.pathname + location.search });
      } catch (e) {
        // ignore
      }
    } catch (err) {
      // swallow errors to avoid breaking app if Smartlook is not available
      // console.debug('useSmartlookPageViews error', err);
    }
  }, [location.pathname, location.search]);
}
