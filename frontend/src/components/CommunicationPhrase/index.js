import LoopIcon from '@mui/icons-material/Loop';
import LuckcloverDictionarySkeleton from '../../components/LuckcloverDictionary/Skeleton';
import InfiniteScroll from '../UI/InfiniteScroll';
import PropTypes from 'prop-types';
// import React from 'react';
import CommunicationPhraseItem from './Item';
import SentenceTopicSettingModal from './SettingModal';
import useStyle from './style';

import React, { useState, useEffect } from 'react';
import sentenceApi from '../../apis/sentenceApi';


const SentenceComponent = () => {
  const [totalSentences, setTotalSentences] = useState(null);
  const [sentenceList, setSentenceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalSentences = async () => {
      try {
        const response = await sentenceApi.getTotalSentences();
        setTotalSentences(response.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchSentenceList = async () => {
      try {
        const response = await sentenceApi.getSentenceList();
        setSentenceList(response.data.sentenceList); // Truy cập đến sentenceList trong dữ liệu API
      } catch (error) {
        setError(error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchTotalSentences();
      await fetchSentenceList();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>API Data</h1>
      <h2>Total Sentences</h2>
      <pre>{JSON.stringify(totalSentences, null, 2)}</pre>
      <h2>Sentence List</h2>
      <ul>
        {sentenceList.map((sentence, index) => (
          <li key={index}>
            <p><strong>Sentence:</strong> {sentence.sentence}</p>
            <p><strong>Mean:</strong> {sentence.mean}</p>
            {sentence.note && <p><strong>Note:</strong> {sentence.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default SentenceComponent;

