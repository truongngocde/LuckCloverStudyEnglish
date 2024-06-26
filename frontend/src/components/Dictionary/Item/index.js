import Speaker from '../../UI/Speaker';
import WordFavorite from '../../UI/WordFavorite';
import { DEFAULTS } from '../../../constants';
import { cloudinaryImgOptimize } from '../../../helpers';
import PropTypes from 'prop-types';
import React from 'react';
import useStyle from './style';

function DictionaryItem({ word, type, phonetic, picture, mean, onShowDetail }) {
  const classes = useStyle();
  const imgSrc = cloudinaryImgOptimize(
    picture ? picture : DEFAULTS.IMAGE_SRC,
    50,
    50,
    true,
    true
  );
  
  return (
    <div className={`${classes.root} flex-center-between`}>
      <div
        className="w-100 flex-center--ver"
        onClick={() => onShowDetail(word)}
      >
        {/* <img className={classes.picture} src={imgSrc} alt="photo" /> */}
        <div className="ml-8 flex-grow-1">
          <h3 className={classes.word}>
            {word}{' '}
            {Boolean(type) && <span className={classes.type}>( {type} )</span>}
          </h3>
          {Boolean(phonetic) && (
            <p className={`${classes.phonetic} phonetic`}>/ {phonetic} /</p>
          )}
          <p className={classes.mean}>{mean}</p>
        </div>
      </div>

      <div className="flex-center--ver">
        <div className="mr-5">
          <Speaker text={word} />
        </div>
        <WordFavorite word={word} />
      </div>
    </div>
  );
}

DictionaryItem.propTypes = {
  mean: PropTypes.string,
  onShowDetail: PropTypes.func,
  phonetic: PropTypes.string,
  picture: PropTypes.string,
  type: PropTypes.string,
  word: PropTypes.string,
};

DictionaryItem.defaultProps = {
  onShowDetail: function () {},
};

export default DictionaryItem;
