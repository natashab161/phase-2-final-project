import { useEffect } from 'react';

const GoogleAnalytics = () => {
  useEffect(() => {
    // Load the gtag.js script
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-8WTLFQ4XRL';
    script.async = true;
    document.body.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    const gtag = (...args) => {
      window.dataLayer.push(args);
    };
    gtag('js', new Date());
    gtag('config', 'G-8WTLFQ4XRL');
  }, []);

  return null;
};

export default GoogleAnalytics;
