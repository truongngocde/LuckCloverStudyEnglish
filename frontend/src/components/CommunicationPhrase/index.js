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

  const classes = useStyle();

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
    <div className={`${classes.root} luckclover-container`}>
      {/* title - menu */}
      <div className="flex-center-between">
        <h1 className="luckclover-title">1000+ Cụm từ giao tiếp</h1>
        {/* <SentenceTopicSettingModal onSelectTopic={onSelectTopic} /> */}
      </div>
      <div className="luckclover-break"></div>

      {/* list content */}
      <div className={classes.contentWrap}>
        <div className={`${classes.listWrap} w-100`}>
          <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
            <>
              {/* render list */}
              {sentenceList.map((item, index) => (
                <li className={classes.listItem} key={index}>
                  <CommunicationPhraseItem {...item} />
                </li>
              ))}

              {/* infinite scrolling */}
            </>
          </ul>
        </div>
      </div>
      <ul>
        {/* render list */}
        {sentenceList.map((item, index) => (
          <li className={classes.listItem} key={index}>
            <CommunicationPhraseItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentenceComponent;
