import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const FormCheckbox = ({
  input: { value, onChange },
  text = ''
}) => (
  <Checkbox
    onChange={ onChange }
    checked={ value }
    value={ value }
  >
    { text }
  </Checkbox>
);

FormCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  text: PropTypes.string,
};

export default FormCheckbox;
