import MatchSentenceData from '../../components/Chanllenges/MatchSentence/data';
import useCloseNavigation from '../../hooks/useCloseNavigation';
import useTitle from '../../hooks/useTitle';
import React from 'react';

function MatchSentenceGPage() {
  useTitle('Ghép câu (Sentence matching)');
  useCloseNavigation();

  return <MatchSentenceData />;
}

export default MatchSentenceGPage;
