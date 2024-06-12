import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tag from '../../UI/Tag';
import { SENTENCE_TOPICS } from '../../../constants/sentence-topics';
import { addOrDelItemInArray } from '../../../helpers';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import useStyle from './style';

function SentenceTopicModal({ onClose, onSelect, open }) {
  const classes = useStyle();
  const topicRef = useRef([]);

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      keepMounted
      maxWidth="md"
      onClose={onClose}
    >
      <DialogTitle className={classes.title}>Chọn chủ đề...</DialogTitle>

      <DialogContent dividers classes={{ dividers: classes.breakLine }}>
        <ul className="d-flex flex-wrap">
          {SENTENCE_TOPICS.map((topic, index) => (
            <div className="m-2" key={index}>
              <Tag
                title={topic.title}
                id={topic.key}
                onChange={(idTopic) => addOrDelItemInArray(topicRef.current, idTopic)}
              />
            </div>
          ))}
        </ul>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} className="_btn _btn-stand">
          Đóng
        </Button>
        <Button
          onClick={() => onSelect(topicRef.current)}
          className="_btn _btn-primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SentenceTopicModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

SentenceTopicModal.defaultProps = {
  open: false,
  onClose: () => {},
  onSelect: () => {},
};

export default SentenceTopicModal;
