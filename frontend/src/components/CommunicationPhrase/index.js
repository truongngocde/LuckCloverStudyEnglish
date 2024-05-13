import LoopIcon from '@mui/icons-material/Loop';
//import LuckcloverDictionarySkeleton from 'components/LuckcloverDictionary/Skeleton';
import InfiniteScroll from '../UI/InfiniteScroll';
import PropTypes from 'prop-types';
import React from 'react';
import CommunicationPhraseItem from './Item';
import SentenceTopicSettingModal from './SettingModal';
import useStyle from './style';

function CommunicationPhrase({
  isFirstLoad,
  loading,
  more,
  list,
  onLoadData,
  onSelectTopic,
}) {
  const classes = useStyle();

  return (
    <div className={`${classes.root} luckclover-container`}>
      {/* title - menu */}
      <div className="flex-center-between">
        <h1 className="luckclover-title">1000+ Cụm từ giao tiếp</h1>
        <SentenceTopicSettingModal onSelectTopic={onSelectTopic} />
      </div>
      <div className="luckclover-break"></div>

      {/* list content */}
      <div className={classes.contentWrap}>
        <div className={`${classes.listWrap} w-100`}>
          <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
            <>
              {isFirstLoad ? (
                //<LuckcloverDictionarySkeleton className={classes.skeleton} />
                null
              ) : (
                <>
                  {list && list.length > 0 ? (
                    <>
                      {/* render list */}
                      {list.map((item, index) => (
                        <li className={classes.listItem} key={index}>
                          <CommunicationPhraseItem {...item} />
                        </li>
                      ))}

                      {/* infinite scrolling */}
                      {!loading && more && (
                        <InfiniteScroll
                          onTouchAnchor={onLoadData}
                          threshold={1}>
                          <div className="w-100 t-center">
                            <LoopIcon className="ani-spin" />
                          </div>
                        </InfiniteScroll>
                      )}
                    </>
                  ) : (
                    // empty list
                    <h3 className="notfound-title h-100 flex-center t-center">
                      Không tìm thấy cụm từ nào trong từ điển
                    </h3>
                  )}
                </>
              )}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
}

CommunicationPhrase.propTypes = {
  isFirstLoad: PropTypes.bool,
  list: PropTypes.array,
  loading: PropTypes.bool,
  more: PropTypes.bool,
  onLoadData: PropTypes.func,
  onSelectTopic: PropTypes.func,
};

CommunicationPhrase.defaultProps = {
  more: false,
  loading: false,
  isFirstLoad: false,
  list: [],
  onLoadData: function () {},
  onSelectTopic: function () {},
};

export default CommunicationPhrase;
