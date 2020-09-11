import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import {
  editBtn,
  deactivateBtn,
  activateBtn,
  deleteBtn
} from './TableActionButtons.scss';

const TableActionButtons = ({
  record,
  editButtonVisible = true,
  deleteButtonVisible = false,
  activateButtonVisible = false,
  handleEdit,
  handleActivate,
  handleDeactivate
}) => (
  <div>
    { editButtonVisible &&
      <Button
        id={ record.id }
        onClick={ handleEdit }
        className={ editBtn }
      >
        Edit
      </Button>
    }
    { activateButtonVisible && record.isActive &&
      <Button
        id={ record.id }
        onClick={ handleDeactivate }
        className={ deactivateBtn }
      >
        Deactivate
      </Button>
    }
    { activateButtonVisible && !record.isActive &&
      <Button
        id={ record.id }
        onClick={ handleActivate }
        className={ activateBtn }
      >
        Activate
      </Button>
    }
    { deleteButtonVisible &&
      <Button
        id={ record.id }
        onClick={ handleDeactivate }
        className={ deleteBtn }
      >
        Delete
      </Button>
    }
  </div>
);

TableActionButtons.propTypes = {
  record: PropTypes.object.isRequired,
  editButtonVisible: PropTypes.bool,
  deleteButtonVisible: PropTypes.bool,
  activateButtonVisible: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleActivate: PropTypes.func,
  handleDeactivate: PropTypes.func
};

export default TableActionButtons;
