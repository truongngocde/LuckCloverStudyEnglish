import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

function DictionarySkeleton({ className }) {
  return (
    <div className={className}>
      {new Array(10).fill(0).map((_, index) => (
        <Skeleton key={index} animation="wave" variant="rect" />
      ))}
    </div>
  );
}

DictionarySkeleton.propTypes = {
  className: PropTypes.string,
};

export default DictionarySkeleton;