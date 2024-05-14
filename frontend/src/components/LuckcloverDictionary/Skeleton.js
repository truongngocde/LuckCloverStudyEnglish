import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

function LuckcloverDictionarySkeleton({ className }) {
  return (
    <div className={className}>
      {new Array(10).fill(0).map((_, index) => (
        <LuckcloverDictionarySkeleton key={index} animation="wave" variant="rect" />
      ))}
    </div>
  );
}

LuckcloverDictionarySkeleton.propTypes = {
  className: PropTypes.string,
};

export default LuckcloverDictionarySkeleton;