import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

class FroodInputNumber extends Component {

  onChange = (value) => {
    this.props.onChange(this.props.id, value);
  }

  render() {
    const {
      max,
      min,
      defaultValue
    } = this.props;
    return (
      <InputNumber
        max={ max }
        min={ min }
        defaultValue={ defaultValue }
        onChange={ this.onChange }
      />
    );
  }
}

FroodInputNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  defaultValue: PropTypes.number.isRequired,
};

export default FroodInputNumber;
