import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import SentenceTopicModal from './SentenceTopicModal';

function SentenceTopicSettingModal({ onSelectTopic }) {
  const [showTopicModal, setShowTopicModal] = useState(false);

  return (
    <>
      <SettingsIcon
        className="luckclover-setting-icon"
        onClick={() => setShowTopicModal(true)}
      />

      {/* sentence topic setting modal */}
      <SentenceTopicModal
        onClose={() => setShowTopicModal(false)}
        open={showTopicModal}
        onSelect={(topics) => {
          onSelectTopic(topics);
          setShowTopicModal(false);
        }}
      />
    </>
  );
}

SentenceTopicSettingModal.propTypes = {
  onSelectTopic: PropTypes.func,
};

SentenceTopicSettingModal.defaultProps = {
  onSelectTopic: function () {},
};

export default SentenceTopicSettingModal;
