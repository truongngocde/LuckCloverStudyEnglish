import MatchWordData from '../../components/Chanllenges/MatchWord/data';
import useCloseNavigation from '../../hooks/useCloseNavigation';
import useTitle from '../../hooks/useTitle';
import React from 'react';

function MatchWordGPage() {
  useTitle('Ghép từ (Word matching)');
  useCloseNavigation();

  return <MatchWordData />;
}

export default MatchWordGPage;
