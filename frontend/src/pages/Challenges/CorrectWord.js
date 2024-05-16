import CorrectWordData from '../../components/Chanllenges/CorrectWord/data';
import useCloseNavigation from '../../hooks/useCloseNavigation';
import useTitle from '../../hooks/useTitle';
import React from 'react';

function CorrectWordPage() {
  useTitle("Hãy chọn từ đúng (Let's choose the correct word)");
  useCloseNavigation();
  return <CorrectWordData />;
}

export default CorrectWordPage;