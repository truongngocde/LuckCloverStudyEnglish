import FastWordData from '../../components/Chanllenges/FastWord/data';
import useCloseNavigation from '../../hooks/useCloseNavigation';
import useTitle from '../../hooks/useTitle';
import React from 'react';

function FastWordPage() {
  useTitle('Tay nhanh hơn não');
  useCloseNavigation();
  return <FastWordData />;
}

export default FastWordPage;
