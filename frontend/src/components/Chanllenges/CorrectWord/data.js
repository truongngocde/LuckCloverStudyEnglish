import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayIcon from '@mui/icons-material/PlayCircleFilledWhite';
import challengesApi from '../../../apis/challengesApi';
import GlobalLoading from '../../UI/GlobalLoading';
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
  const [state, setState] = useState(0);
  const [wordPack, setWordPack] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();
  const nQuestion = useRef(50);

  const getWordPackage = async ({ type, topics, level, specialty }) => {
    try {
      setState(1);

      const n =
        nQuestion.current < 0 || nQuestion.current > MAX_LEN_WORD_PACK
          ? 100
          : nQuestion.current;

      const apiRes = await challengesApi.getWordPackCorrectWord(
        type,
        level,
        specialty,
        topics,
        n,
      );

      if (apiRes.status === 200) {
        const { wordPack = [] } = apiRes.data;
        if (wordPack.length === 0) {
          dispatch(
            setMessage({
              type: 'warning',
              message:
                'Rất xin lỗi, gói từ vựng hiện tại không đủ. Vui lòng thử lại sao',
              duration: 3000,
            }),
          );
          setState(0);
          return;
        }

        setWordPack(wordPack);
        setState(2);
        return;
      }

      dispatch(
        setMessage({
          type: 'warning',
          message: 'Lấy gói từ vựng thất bại, thử lại !',
        }),
      );
      setState(0);
    } catch (error) {
      const message =
        error.response?.data?.message || 'Lấy gói từ vựng thất bại, thử lại !';
      dispatch(setMessage({ type: 'error', message }));
      setState(0);
    }
  };

  return (
    <>
      {state === 0 ? (
        <WordPack
          open={true}
          onChoose={getWordPackage}
          onCancel={() => history(-1)}
          topicMultiples={true}
          title="Lựa chọn gói từ vựng"
          okBtnText="Bắt đầu"
          cancelBtnText="Quay lại"
          cancelBtnProps={{ startIcon: <ArrowBackIcon /> }}
          okBtnProps={{ startIcon: <PlayIcon /> }}>
          <InputCustom
            type="number"
            inputProps={{
              min: 5,
              max: MAX_LEN_WORD_PACK,
              defaultValue: 50,
            }}
            placeholder="Nhập số câu"
            label="Số câu"
            className="w-100"
            onChange={(e) => (nQuestion.current = e.target.value)}
          />
        </WordPack>
      ) : state === 1 ? (
        <GlobalLoading title="Đang tải gói câu hỏi ..." />
      ) : (
        <CorrectWord list={wordPack} />
      )}
    </>
  );
}

export default CorrectWordData;
