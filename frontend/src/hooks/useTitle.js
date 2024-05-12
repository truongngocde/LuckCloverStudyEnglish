import { useEffect, useState } from 'react';

// set title for component
function useTitle(title = 'Luckclover', isOverride = false) {
  useEffect(() => {
    if (isOverride) {
      document.title = title;
    } else {
      document.title = title !== 'Luckclover' ? `${title} - Luckclover` : title;
    }
  }, []);

  return null;
}

export default useTitle;