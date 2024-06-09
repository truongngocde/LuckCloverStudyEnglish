import Popover from '@mui/material/Popover';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';
import { WORD_SPECIALTY } from '../../../constants';
import { TOPICS } from '../../../constants/topics';
import { cloudinaryImgOptimize } from '../../../helpers';
import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../Tag';
import useStyle from './style';

function sliceTopics(topics) {
  let res = [];
  topics.forEach((topic) => {
    res.push(TOPICS.find((i) => i.key === topic));
  });
  return res;
}

function WordDetailModal(props) {
  const {
    sentence,
    mean,
    note,
    topics,
    open,
    onClose,
    loading,
  } = props;

  const classes = useStyle();

  return (
    <Popover
      classes={{
        root: `${classes.root} flex-center`,
        paper: `${classes.paper} container`,
      }}
      open={open}
      onClose={onClose}
      anchorReference={'none'}>
      <div className="flex-center-between">
        <h2 className={classes.title}>
          Chi tiết từ <span className={classes.sentenceTitle}>{`"${sentence}"`}</span>
        </h2>
        <CloseIcon
          className={`${classes.closeIcon} cur-pointer`}
          onClick={onClose}
        />
      </div>

      <div className="luckclover-break"></div>

      {loading ? (
        <Skeleton
          style={{ width: '100%', height: '35vh' }}
          variant="rect"
          animation="wave"
        />
      ) : (
        <div className={classes.content}>
          <div className="flex-center--ver my-4">
            <div>
              <p className={classes.sentence}>
                {sentence}&nbsp;
                <span className={classes.mean}>{` - ${mean}`}</span>
              </p>
              
            </div>
          </div>


          {topics && topics.length > 0 && (
            <>
              <b className={classes.label}>Chủ đề:</b>

              <div className={`${classes.topics} d-flex flex-wrap`}>
                {sliceTopics(topics).map((topic, index) => (
                  <Tag key={index} title={topic.title} iconSrc={topic.icon} />
                ))}
              </div>
            </>
          )}


          {/* {note && note !== '' && (
            <>
              <b className={classes.label}>Ghi chú:</b>
              <p>
                {note.split('\n').map((i, index) => (
                  <span key={index}>
                    {i} <br />
                  </span>
                ))}
              </p>
            </>
          )} */}
        </div>
      )}
    </Popover>
  );
}

WordDetailModal.propTypes = {
  loading: PropTypes.bool,
  mean: PropTypes.string,
  note: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  topics: PropTypes.array,
  sentence: PropTypes.string,
};

WordDetailModal.defaultProps = {
  loading: true,
  mean: '',
  note: '',
  onClose: function () {},
  open: false,
  topics: [],
  sentence: '',
};

export default WordDetailModal;
