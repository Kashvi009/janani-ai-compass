import { useEffect } from 'react';

export const SmoothScroll = () => {
  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleAnchorLinks = () => {
      const links = document.querySelectorAll('a[href^="#"]');
      
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
              const headerOffset = 80; // Account for fixed header
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    };

    // Run on mount and when content changes
    handleAnchorLinks();
    
    // Re-run when new content is added
    const observer = new MutationObserver(handleAnchorLinks);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
};