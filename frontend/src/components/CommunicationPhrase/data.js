import sentenceApi from '../../apis/sentenceApi';
import { equalArray } from '../../helpers';
import React, { useEffect, useRef, useState } from 'react';
import CommunicationPhrase from './index';

const perPage = 20;

function CommunicationPhraseData() {

  const [list, setList] = useState([]);
  
  useEffect(() => {
    let isSub = true;
    (async function () {
      try {
        
        const apiRes = await sentenceApi.getSentenceList();
        if (apiRes.status === 200 && isSub) {
          const { sentenceList = [] } = await apiRes.data;
          setList([...sentenceList]);
        }
      } catch (error) {
      } 
    })();
  
  }, []);

  return (
    <CommunicationPhrase
      list={list}      
    />
  );
}

export default CommunicationPhraseData;
