import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

class FormDatePicker extends Component {
  handleChange = (date, dateString) => {
    this.props.input.onChange(dateString);
  }

  render() {
    const { input: { value }, readonly } = this.props;
    return (
      <DatePicker
        disabled={ readonly }
        onChange={ this.handleChange }
        allowClear={ false }
        showTime={ false }
        style={ { width: '100%' } }
        size="default"
        format="DD-MMMM-YYYY"
        value={ value !== '' && moment(value, 'DD-MMMM-YYYY') }
        defaultValue={ moment() }
      />
    );
  }
}

FormDatePicker.propTypes = {
  input: PropTypes.object,
  readonly: PropTypes.bool,
};

export default FormDatePicker;
