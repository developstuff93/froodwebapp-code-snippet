import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import moment from 'moment';

class FormTimePicker extends Component {

  handleChange = (time, timeString) => {
    this.props.input.onChange(timeString);
  }

  render() {
    const { input: { value }, timeFormat } = this.props;
    return (
      <TimePicker
        format={ timeFormat }
        onChange={ this.handleChange }
        style={ { width: '100%' } }
        value={ value !== '' && moment(value, timeFormat) }
      />
    );
  }
}

FormTimePicker.propTypes = {
  input: PropTypes.object.isRequired,
  timeFormat: PropTypes.string.isRequired
};

export default FormTimePicker;
