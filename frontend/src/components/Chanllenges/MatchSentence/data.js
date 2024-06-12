import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayIcon from '@mui/icons-material/PlayCircleFilledWhite';
import challengesApi from '../../../apis/challengesApi';
import GlobalLoading from '../../UI/GlobalLoading';
import InputCustom from '../../UI/InputCustom';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../../redux/slices/messageSlice';
import SentenceTopicModal from '../../CommunicationPhrase/SentenceTopicModal/';
import SentenceMatch from '.';
const MAX_LEN_WORD_PACK = 500;

function SentenceMatchData() {
  // 0 - choose word pack, 1 - get pack, 2 - done
  const [state, setState] = useState(0);
  const [sentencePack, setSentencePack] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();
  const nQuestion = useRef(50);
  const [showTopicModal, setShowTopicModal] = useState(true);

  const getSentencePackage = async (topics) => {
    try {
      setState(1);
      const n = nQuestion.current < 0 || nQuestion.current > MAX_LEN_WORD_PACK
        ? 100
        : nQuestion.current;

      const apiRes = await challengesApi.getSentencePackWordMatch(topics, n);
      if (apiRes.status === 200) {
        const sentencePack = apiRes.data;
        if (sentencePack.length === 0) {
          dispatch(setMessage({
            type: 'warning',
            message: 'Rất xin lỗi, gói từ vựng hiện tại không đủ. Vui lòng thử lại sau',
            duration: 3000,
          }));
          setState(0);
          return;
        }

        setSentencePack(sentencePack);
        setState(2);
        return;
      }

      dispatch(setMessage({
        type: 'warning',
        message: 'Lấy gói từ vựng thất bại, thử lại !',
      }));

      setState(0);
    } catch (error) {
      const message = error.response?.data?.message || 'Lấy gói từ vựng thất bại, thử lại !';
      dispatch(setMessage({ type: 'error', message }));
      setState(0);
    }
  };

  return (
    <>
      {state === 0 ? (
        <SentenceTopicModal
          onClose={() => history('/challenges')}
          open={showTopicModal}
          onSelect={(topics) => {
            setShowTopicModal(false);
            getSentencePackage({ topics });
          }}
        />
      ) : state === 1 ? (
        <GlobalLoading title="Đang tải gói câu hỏi ..." />
      ) : (
        <SentenceMatch list={sentencePack} />
      )}
    </>
  );
}

export default SentenceMatchData;
