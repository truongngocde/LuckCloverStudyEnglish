import { useEffect } from 'react';

function useCloseNavigation() {
  useEffect(() => {
    document.getElementById('luckcloverNav').style.display = 'none';
    return () => {
      document.getElementById('luckcloverNav')?.removeAttribute('style');
    };
  }, []);

  return null;
}

export default useCloseNavigation;