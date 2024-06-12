import { makeStyles } from '@mui/styles';
import { Mic, RecordVoiceOver  } from '@mui/icons-material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/LiveHelp';
import wordApi from '../../../../apis/wordApi';
import Speaker from '../../../UI/Speaker';
import WordDetailModal from '../../../UI/WordDetailModal';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import useSpeechRecognition from '../../../../hooks/useSpeechRecognition';
import useStyle from './style';
const userSplitId = 'userSplitId';

function SpeakWord({ word, mean, onCorrect, onWrong, resetFlag }) {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();
  const originWord = useRef(word.toLowerCase());

  const [isCorrect, setIsCorrect] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    loading: false,
    data: null,
  });
  const classes = useStyle();

  // check is correct
  useEffect(() => {
    let isSub = true;

    if (!isCheck) {
      return;
    }
    if (text.toLowerCase() === word.toLowerCase()) {
      isSub && setIsCorrect(true);
      onCorrect();
    } else {
      isSub && setIsCorrect(false);
      onWrong();
    }

    return () => {
      isSub = false;
    };
  }, [isCheck]);

  // reset when next or prev
  useEffect(() => {
    let isSub = true;
    if (resetFlag === -1) {
      return;
    }

    if (isSub) {
      setIsCheck(false);
      setIsCorrect(false);
      originWord.current = text.toLowerCase();
    }

    return () => (isSub = false);
  }, [resetFlag]);

  // get word detail
  useEffect(() => {
    let isSub = true;

    if (modal.show && modal.loading) {
      (async function () {
        try {
          const apiRes = await wordApi.getWordDetails(word);
          if (apiRes.status === 200 && isSub) {
            setModal({ show: true, loading: false, data: { ...apiRes.data } });
          }
        } catch (error) {
          isSub && setModal({ show: false, loading: false, data: null });
        }
      })();
    }

    return () => (isSub = false);
  }, [modal]);

  // @rendering ...
  return (
    <div className={classes.root}>
      <div className={`${classes.split} flex-center`}>{text}</div>

      <div>
        <div className="flex-center-between my-4">
          <Tooltip title="Xem đáp án">
            <HelpIcon
              className={`${classes.helpIcon} cur-pointer`}
              onClick={() =>
                setModal({ loading: true, data: null, show: true })
              }
            />
          </Tooltip>
          <p className={`${classes.mean} t-center px-4`}>
            {word} ({mean})
          </p>
          <Speaker className={classes.speaker} text={word} />
        </div>
        {isCheck && (
          <p
            className={`${classes.answer} t-center ${
              isCorrect ? 'right' : 'wrong'
            }`}
          >
            {isCorrect ? 'Chính xác' : 'Sai rồi'}
          </p>
        )}
      </div>

      <div id={userSplitId} className={`${classes.split} flex-center`}>
        <Button onClick={isListening ? stopListening : startListening}>
          {isListening ? <GraphicEqIcon /> : <Mic />}
        </Button>
      </div>
      {/* word detail modal */}
      {modal.show && (
        <WordDetailModal
          open={modal.show}
          loading={modal.loading}
          onClose={() => setModal({ loading: false, data: null, show: false })}
          {...modal.data}
        />
      )}
    </div>
  );
}

SpeakWord.propTypes = {
  mean: PropTypes.string,
  onCorrect: PropTypes.func,
  onWrong: PropTypes.func,
  resetFlag: PropTypes.number,
  word: PropTypes.string,
};

SpeakWord.defaultProps = {
  mean: '',
  word: '',
  onCorrect: function () {},
  onWrong: function () {},
  resetFlag: -1,
};

export default SpeakWord;
