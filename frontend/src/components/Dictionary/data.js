import commonApi from '../../apis/flashcardApi';
import wordApi from '../../apis/wordApi';
import WordDetailModal from '../UI/WordDetailModal';
import { TOEIC_KEY } from '../../constants/topics';
import { equalArray } from '../../helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Dictionary from './index';

const perPage = 20;

function DictionaryData({ isTOEIC }) {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('rand');
  const [packInfo, setPackInfo] = useState(() => ({
    type: '-1',
    level: '-1',
    specialty: '-1',
    topics: isTOEIC ? [TOEIC_KEY] : [],
  }));
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    packInfo: {
      type: '-1',
      level: '-1',
      specialty: '-1',
      topics: isTOEIC ? [TOEIC_KEY] : [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [more, setMore] = useState(true); // toggle infinite scrolling
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const totalPage = useRef(0);
  const preSearchList = useRef([]);

  const nextPage = () => {
    if (page < totalPage.current) {
      setPage(page + 1);
    } else {
      setMore(false);
    }
  };

  const settingWordPack = (info) => {
    // check old pack vs new pack
    let isEqual = true;
    for (let k in packInfo) {
      if (k !== 'topics' && packInfo[k] !== info[k]) {
        isEqual = false;
        break;
      }
    }
    if (isEqual) isEqual = equalArray(packInfo.topics, info.topics);

    totalPage.current = 0;
    preSearchList.current = [];
    setMore(true);
    setList([]);
    setPackInfo(info);
    setPage(1);
  };

  // const onSortTypeChange = (type = 'rand') => {
  //   if (type === sortType) return;
  //   preSearchList.current = [];
  //   setSortType(type);
  //   setPage(1);
  //   setList([]);
  // };

  const onSearchWord = async (word) => {
    try {
      if (word === '') {
        setList(preSearchList.current);
        setMore(true);
        return;
      }

      const apiRes = await wordApi.getSearchWord(word);
      if (apiRes.status === 200) {
        const { packList = [] } = apiRes.data;
        setList(packList);
        setMore(false);
      }
    } catch (error) {}
  };

  // get total word pack
  useEffect(() => {
    let isSub = true;

    (async function () {
      try {
        const apiRes = await commonApi.getWordPackTotal(packInfo);
        if (apiRes.status === 200 && isSub) {
          const { total = 0 } = apiRes.data;
          totalPage.current = Math.ceil(total / perPage);
        }
      } catch (error) {}
    })();

    return () => (isSub = false);
  }, [packInfo]);

  // get word pack
  useEffect(() => {
    let isSub = true;

    (async function () {
      try {
        setLoading(true);
        const apiRes = await wordApi.getWordPack(
          page,
          perPage,
          packInfo,
          // sortType,
        );
        if (apiRes.status === 200 && isSub) {
          const { packList = [] } = apiRes.data;
          const newList = [...list, ...packList];
          preSearchList.current = newList;
          setList(newList);
        }
      } catch (error) {
      } finally {
        if (isSub) {
          setLoading(false);
          isFirstLoad && setIsFirstLoad(false);
        }
      }
    })();

    return () => (isSub = false);
  }, [page, packInfo]);

  return (
    <>
      <Dictionary
        isTOEIC={isTOEIC}
        list={list}
        loading={loading}
        onLoadData={nextPage}
        more={more}
        isFirstLoad={isFirstLoad}
        onSettingWordPack={settingWordPack}
        // onSortTypeChange={onSortTypeChange}
        onSearchWord={onSearchWord}
      />
      {/* <WordDetailModal /> */}
    </>
  );
}

DictionaryData.propTypes = {
  isTOEIC: PropTypes.bool,
};

DictionaryData.defaultProps = {
  isTOEIC: false,
};

export default DictionaryData;
