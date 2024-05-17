import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayIcon from '@mui/icons-material/PlayCircle';
import challengesApi from '../../../apis/challengesApi';
import GlobalLoading from '../../../components/UI/GlobalLoading';
import InputCustom from '../../UI/InputCustom';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../../redux/slices/messageSlice';
import CorrectWord from '.';
import WordPack from '../../UI/WorkPack';

const MAX_LEN_WORD_PACK = 500;

function CorrectWordData() {
  // 0 - choose word pack, 1 - get pack, 2 - done
  

  return (
    <>
      <CorrectWord />
    </>
  );
}

export default CorrectWordData;
