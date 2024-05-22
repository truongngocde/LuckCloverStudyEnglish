import SettingsIcon from '@mui/icons-material/Settings';
import WordPack from '../UI/WorkPack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function SettingWordPack({ classNameIcon, onChoose }) {
  const [openWordPack, setOpenWordPack] = useState(false);

  const onSelect = (v) => {
    onChoose(v);
    setOpenWordPack(false);
  };

  return (
    <>
      <SettingsIcon
        className={classNameIcon}
        onClick={() => setOpenWordPack(true)}
      />

      {/* setting modal */}
      {openWordPack && (
        <WordPack
          open={openWordPack}
          onCancel={() => setOpenWordPack(false)}
          onChoose={onSelect}
        />
      )}
    </>
  );
}

SettingWordPack.propTypes = {
  classNameIcon: PropTypes.string,
  onChoose: PropTypes.func,
};

SettingWordPack.defaultProps = {
  onChoose: () => {},
};

export default SettingWordPack;
