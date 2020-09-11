import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

const FormSwitch = ({
  input: { value, onChange },
  size = 'default',
  checkedText,
  unCheckedText
}) => (
  <Switch
    size={ size }
    onChange={ onChange }
    checked={ value }
    value={ value }
    checkedChildren={ checkedText }
    unCheckedChildren={ unCheckedText }
  />
);

FormSwitch.propTypes = {
  input: PropTypes.object.isRequired,
  checkedText: PropTypes.string,
  unCheckedText: PropTypes.string,
  isSwitch: PropTypes.bool,
  size: PropTypes.string
};

export default FormSwitch;
