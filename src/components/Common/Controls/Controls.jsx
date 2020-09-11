import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import styles from './Controls.scss';

const Controls = ({
  save = false,
  cancel = true,
  submit = false,
  update = false,
  submitText = 'Save',
  saveText = 'Save',
  onCancel,
  onSave,
  onUpdate

}) => (
  <div className={ styles.buttons }>
    { cancel &&
      <Button
        className={ styles.cancelButton }
        onClick={ onCancel }
      >
        Cancel
      </Button>
    }
    { update &&
      <Button
        onClick={ onUpdate }
        className={ styles.updateButton }
      >
        Update
      </Button>
    }
    { save &&
      <Button
        className={ styles.saveButton }
        onClick={ onSave }
      >
        { saveText }
      </Button>
    }
    { submit &&
      <Button
        type="submit"
        className={ styles.saveButton }
      >
        { submitText }
      </Button>
    }
  </div>
);

Controls.propTypes = {
  save: PropTypes.bool,
  cancel: PropTypes.bool,
  submit: PropTypes.bool,
  update: PropTypes.bool,
  submitText: PropTypes.string,
  saveText: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default Controls;
