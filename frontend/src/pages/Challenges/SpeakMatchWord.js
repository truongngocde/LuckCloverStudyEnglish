import SpeakMatchWordData from '../../components/Chanllenges/SpeakMatchWord/data';
import useCloseNavigation from '../../hooks/useCloseNavigation';
import useTitle from '../../hooks/useTitle';
import React from 'react';

function MatchWordGPage() {
  useTitle('Luyện nói với các từ vựng');
  useCloseNavigation();

  return <SpeakMatchWordData />;
}

export default MatchWordGPage;