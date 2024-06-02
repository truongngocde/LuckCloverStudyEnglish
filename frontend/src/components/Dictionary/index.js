import LoopIcon from '@mui/icons-material/Loop';
import AutoSearchInput from '../UI/AutoSearchInput';
import InfiniteScroll from '../UI/InfiniteScroll';
import WordSortModal from '../UI/WordDetailModal';
import PropTypes from 'prop-types';
import React from 'react';
import DictionaryItemData from './Item/data';
import SettingWordPack from './SettingWordPack';
import DictionarySkeleton from './Skeleton';
import useStyle from './style';

function Dictionary({
  list,
  loading,
  onLoadData,
  more,
  isFirstLoad,
  onSettingWordPack,
  // onSortTypeChange,
  onSearchWord,
  isTOEIC,
}) {
  const classes = useStyle();

  return (
    <div className={`${classes.root} -container`}>
      {/* title - menu */}
      <div className="flex-center-between">
        <h1 className="-title">Từ điển</h1>
        <div>
          <WordSortModal
            // onSelect={onSortTypeChange}
            classNameIcon="-setting-icon mr-5"
          />
          {!isTOEIC && (
            <SettingWordPack
              onChoose={onSettingWordPack}
              classNameIcon="-setting-icon"
            />
          )}
        </div>
      </div>
      <div className="-break"></div>

      {/* list content */}
      <div className={classes.contentWrap}>
        <AutoSearchInput disabled={loading} onSearch={onSearchWord} />

        <div className={`${classes.listWrap} w-100`}>
          <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
            <>
              {isFirstLoad ? (
                <DictionarySkeleton className={classes.skeleton} />
              ) : (
                <>
                  {list && list.length > 0 ? (
                    <>
                      {/* render list */}
                      {list.map((item, index) => (
                        <li className={classes.listItem} key={index}>
                          <DictionaryItemData {...item} />
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
                      Không tìm thấy từ nào trong từ điển
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

Dictionary.propTypes = {
  isFirstLoad: PropTypes.bool,
  isTOEIC: PropTypes.bool,
  list: PropTypes.array,
  loading: PropTypes.bool,
  more: PropTypes.bool,
  onLoadData: PropTypes.func,
  onSearchWord: PropTypes.func,
  onSettingWordPack: PropTypes.func,
  onSortTypeChange: PropTypes.func,
};

Dictionary.defaultProps = {
  list: [],
  loading: false,
  more: true,
  isFirstLoad: true,
  isTOEIC: false,
  onLoadData: function () {},
  onSearchWord: function () {},
  onSettingWordPack: function () {},
  onSortTypeChange: function () {},
};

export default Dictionary;
