import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import CarouselIcon from '@mui/icons-material/ViewCarousel';
import CollectionsIcon from '@mui/icons-material/Collections';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TooltipCustom from '../UI/InputCustom';
import WordPack from '../UI/WorkPack';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import GalleryList from './GalleryList';
import SlideShow from './SlideShow';
import useStyle from './style';

const perPage = 7;
const tutorial = 'Có 2 chế độ xem là gallery và slide. Bấm vào biểu tượng mắt để bật tắt nghĩa của từ.';

function Flashcard({
  list,
  total,
  currentPage,
  onNextPage,
  onPrevPage,
  onWordPackChange,
}) {
  const classes = useStyle();
  const [mode, setMode] = useState(0); // 0 - gallery, 1 - slide show
  const [isShowMean, setIsShowMean] = useState(false);
  const [openWordPack, setOpenWordPack] = useState(false);
  const currentSlide = useRef(0);

  return (
    <div className="container my-10">
      <div className="flex-center-between">
        <h1 className="luckclover-title">Flashcard</h1>
        <div className={classes.iconWrap}>
          <Tooltip title="Chế độ bộ sưu tập" placement="bottom">
            <CollectionsIcon
              onClick={() => setMode(0)}
              className={`${classes.icon} ${mode === 0 ? 'active' : ''}`}
            />
          </Tooltip>

          <Tooltip title="Chế độ thẻ đơn" placement="bottom">
            <CarouselIcon
              onClick={() => setMode(1)}
              className={`${classes.icon} ${mode === 1 ? 'active' : ''}`}
            />
          </Tooltip>

          <Tooltip title="Xem nghĩa của từ" placement="bottom">
            {isShowMean ? (
              <VisibilityOffIcon
                className={classes.icon}
                onClick={() => setIsShowMean(false)}
              />
            ) : (
              <VisibilityIcon
                className={classes.icon}
                onClick={() => setIsShowMean(true)}
              />
            )}
          </Tooltip>

          <Tooltip title="Cài đặt gói từ vựng" placement="bottom">
            <SettingsIcon
              className={classes.icon}
              onClick={() => setOpenWordPack(true)}
            />
          </Tooltip>

          {/* <TooltipCustom title={tutorial} placement="bottom">
            <HelpIcon className={classes.icon} />
          </TooltipCustom> */}
          
        </div>
      </div>
      <div className="luckclover-break" />

      {openWordPack && (
        <WordPack
          open={true}
          topicMultiples={true}
          onCancel={() => setOpenWordPack(false)}
          cancelBtnText="Đóng"
          onChoose={(packInfo) => {
            onWordPackChange(packInfo);
            setOpenWordPack(false);
          }}
        />
      )}

      {mode === 0 ? (
        <GalleryList
          list={list}
          onPrev={onPrevPage}
          onNext={onNextPage}
          total={Math.ceil(total / perPage)}
          current={currentPage}
          showMean={isShowMean}
        />
      ) : (
        <SlideShow
          list={list}
          total={total}
          onGetNewList={onNextPage}
          onGetOldList={onPrevPage}
          showMean={isShowMean}
          currentSlide={currentSlide.current}
          onSaveCurrentSlide={(v) => (currentSlide.current = v)}
          totalCurrentSlide={(currentPage - 1) * perPage + currentSlide.current}
        />
      )}
    </div>
  );
}

Flashcard.propTypes = {
  list: PropTypes.array,
  total: PropTypes.number,
  currentPage: PropTypes.number,
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
  onWordPackChange: PropTypes.func,
};

Flashcard.defaultProps = {
  list: [],
  total: 0,
  currentPage: 0,
};

export default Flashcard;
