import InfoIcon from '@mui/icons-material/Info';
import TooltipCustom from '../../UI/TooltipCustom';
import PropTypes from 'prop-types';
import React from 'react';
import useStyle from './style';

function InformationTooltip({ title }) {
  const classes = useStyle();

  return (
    <TooltipCustom title={title} className="cur-help">
      <InfoIcon className={classes.tooltipIcon} />
    </TooltipCustom>
  );
}

InformationTooltip.propTypes = {
  title: PropTypes.string,
};

export default InformationTooltip;
