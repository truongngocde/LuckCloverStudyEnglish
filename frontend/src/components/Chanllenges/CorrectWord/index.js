import WrongIcon from '@mui/icons-material/Cancel';
import RightIcon from '@mui/icons-material/CheckCircle';
import logoChallenge from '../../../assets/icons/challenges/correct-word.png';
import { UX } from '../../../constants';
import { playSoundAnswer } from '../../../helpers/speakerHelper';
import useSpeaker from '../../../hooks/useSpeaker';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import CorrectWordResult from '../Result';
import useStyle from './style';

function shuffleAnswers(word, phonetic, wrongList) {
  let mergeList = [...wrongList, { word, phonetic }];
  return mergeList.sort(() => Math.random() - 0.5);
}

function addClassAnswerItem(status, answerIndex, index, word, answer) {
  if (status !== 0) {
    if (word === answer) return 'right';
    if (answerIndex === index) return 'wrong';
  }
  return '';
}

function CorrectWord({ list }) {
  const classes = useStyle();
  

  return (
    <div className="flex-center-col h-100vh container">
      <div className={`${classes.root} container luckclover-game-box`}>
        {/* title */}
        <div className="luckclover-game-title">
          <img src={logoChallenge} alt="chalenge photo" />
          <h1>Hãy chọn từ đúng</h1>
        </div>

        
      </div>
    </div>
  );
}

CorrectWord.propTypes = {
  list: PropTypes.array,
};

CorrectWord.defaultProps = {
  list: [],
};



export default CorrectWord;
