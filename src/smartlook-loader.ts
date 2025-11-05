// Auto-initialize in production builds
if (import.meta.env.PROD) {
  loadSmartlook();
}

export function loadSmartlook() {
  // Only load in production builds
  if (!import.meta.env.PROD) {
    console.info("Smartlook loader: skipping in non-production environment");
    return;
  }

  if ((window as any).smartlook) {
    console.info("Smartlook loader: already loaded");
    return;
  }

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.charset = "utf-8";
  script.src = "https://web-sdk.smartlook.com/recorder.js";
  script.onload = () => {
    try {
      // Init with your project key and region
      (window as any).smartlook('init', '7f378836fa4e159cd30d8d410da4f07a0164afb8', { region: 'eu' });
      console.info('Smartlook initialized');
    } catch (err) {
      console.warn('Smartlook init error', err);
    }
  };
  script.onerror = () => {
    console.warn('Smartlook script failed to load');
  };

  document.head.appendChild(script);
}

export function isSmartlookAvailable() {
  return !!(window as any).smartlook;
}
