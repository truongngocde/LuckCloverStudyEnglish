import challengesApi from '../../../apis/challengesApi';
import { TOPICS } from '../../../constants/topics';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../../redux/slices/messageSlice';
import FastWord from './index';
import useStyle from './style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';

function FastWordData() {
  const classes = useStyle();
  const [topicKey, setTopicKey] = useState(-1);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    let isSub = true;

    if (topicKey < 0) {
      return;
    }

    (async function () {
      try {
        const apiRes = await challengesApi.getWordPackWordFast(topicKey);

        if (apiRes.status === 200 && isSub) {
          const { wordPack = [] } = apiRes.data;
          if (wordPack.length === 0) {
            const message =
              'Xin lỗi! Danh sách từ cho chủ đề này hiện tại không đủ. Vui lòng chọn lại !';
            dispatch(setMessage({ type: 'warning', message }));
            setList([]);
            return;
          }
          setList([...wordPack]);
        }
      } catch (error) {
        const message =
          'Xin lỗi! Danh sách từ cho chủ đề này hiện tại không đủ. Vui lòng chọn lại !';
        dispatch(setMessage({ type: 'warning', message }));
        setList([]);
      }
    })();

    return () => (isSub = false);
  }, [topicKey]);

  const handleGoBack = () => {
    history(ROUTES.CHALLENGES.HOME);
  };

  const renderTopic = () => (
    <>
      <div className={classes.title}>
        <ArrowBackIcon className={classes.goBackIcon} onClick={handleGoBack} />
        <h1>Chọn một chủ đề</h1>
      </div>
      <div className={classes.topics}>
        {TOPICS.map((topic, index) => (
          <div
            key={index}
            className={classes.topicItem}
            onClick={() => setTopicKey(topic.key)}>
            <img
              src={topic.icon}
              className={classes.topicImg}
              alt={topic.title}
            />
            <h3 className={classes.topicTitle}>{topic.title}</h3>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className={`flex-center ${classes.wrapper}`}>
      <div className={`${classes.bg} w-100 h-100`}></div>

      <div className="container">
        <div className={classes.root}>
          {list.length === 0 ? (
            renderTopic()
          ) : (
            <FastWord topic={topicKey} list={list} />
          )}
        </div>
      </div>
    </div>
  );
}

export default FastWordData;
