import FavoriteDictionaryData from '../components/Dictionary/Favorite/data';
import useTitle from '../hooks/useTitle';
import React from 'react';

function FavoriteDictionaryPage() {
  useTitle('FavoriteDictionary');

  return <FavoriteDictionaryData />;
}

export default FavoriteDictionaryPage;