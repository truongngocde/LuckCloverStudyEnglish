import wordApi from '../../../apis/wordApi';
import WordDetailModal from '../../UI/WordDetailModal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../../redux/slices/messageSlice';
import DictionaryItem from './index';

function DictionaryItemData(props) {
  const [modal, setModal] = useState({ loading: false, open: false });
  const dispatch = useDispatch();

  const onShowDetail = async (word) => {
    try {
      setModal({ open: true, loading: true });
      const apiRes = await wordApi.getWordDetails(word);
      if (apiRes.status === 200) {
        setModal({ open: true, loading: false, ...apiRes.data });
      }
    } catch (error) {
      setModal({ open: false, loading: false });
      dispatch(
        setMessage({
          type: 'error',
          message: 'Không thể lấy thông tin, thử lại.',
        }),
      );
    }
  };

  return (
    <>
      <DictionaryItem {...props} onShowDetail={onShowDetail} />

      {modal.open && (
        <WordDetailModal
          {...modal}
          onClose={() => setModal({ open: false, loading: false })}
        />
      )}
    </>
  );
}

export default DictionaryItemData;
