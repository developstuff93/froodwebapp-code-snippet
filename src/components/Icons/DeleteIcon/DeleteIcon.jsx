import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { deleteIcon } from './DeleteIcon.scss';

const DeleteIcon = ({ id, onClick }) => (
  <Icon
    id={ id }
    type="delete"
    className={ deleteIcon }
    onClick={ onClick }
  />
);

DeleteIcon.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DeleteIcon;
