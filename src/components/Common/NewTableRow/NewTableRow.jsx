/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { newTableRow } from './NewTableRow.scss';

const NewTableRow = ({
  hasData,
  addNewRowText,
  addOtherRowText,
  onClick
}) => (
  <div
    className={ newTableRow }
    onClick={ onClick }
  >
    <Icon type="plus" />
    { hasData ? addNewRowText : addOtherRowText }
  </div>
);

NewTableRow.propTypes = {
  hasData: PropTypes.bool.isRequired,
  addNewRowText: PropTypes.string,
  addOtherRowText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NewTableRow;
