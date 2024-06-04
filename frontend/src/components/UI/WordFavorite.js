import FavoriteIcon from '@mui/icons-material/Favorite';
import UnFavoriteIcon from '@mui/icons-material/FavoriteBorder';
import accountApi from '../../apis/accountApi';
import { ROUTES } from '../../constants';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../redux/slices/messageSlice';
import { setAddFavorites } from '../../redux/slices/useInfoSlice';

function WordFavorite({ word }) {
  const { isAuth, username, favoriteList } = useSelector(
    (state) => state.userInfo,
  );
  const history = useNavigate();
  const dispatch = useDispatch();

  const isFavorite =
    favoriteList.findIndex((i) => i.toLowerCase() === word.toLowerCase()) !==
    -1;

  const handleClick = async () => {
    try {
      const apiRes = await accountApi.putToggleWordFavorite(
        username,
        word,
        !isFavorite,
      );
      if (apiRes.status === 200) {
        dispatch(setAddFavorites({ word, isAdd: !isFavorite }));
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Thất bại, thử lại !';
      dispatch(setMessage({ type: 'error', message }));
    }
  };

  return (
    <>
      {isAuth ? (
        <>
          {isFavorite ? (
            <FavoriteIcon
              onClick={handleClick}
              className="luckclover-favorite active"
            />
          ) : (
            <UnFavoriteIcon onClick={handleClick} className="luckclover-favorite" />
          )}
        </>
      ) : (
        <UnFavoriteIcon
          onClick={() => history(ROUTES.LOGIN)}
          className="luckclover-favorite"
        />
      )}
    </>
  );
}

WordFavorite.propTypes = {
  word: PropTypes.string,
};

WordFavorite.defaultProps = {
  word: '',
};

export default WordFavorite;
