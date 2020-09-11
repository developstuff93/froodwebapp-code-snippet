import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

class FroodDatePicker extends PureComponent {
  componentWillMount() {
    this.props.onChange(moment().format('DD-MMMM-YYYY'), this.props.id, this.props.columnName);
  }

  handleChange = (date, dateString) => {
    this.props.onChange(dateString, this.props.id, this.props.columnName);
  }

  render() {
    const { id, value } = this.props;
    return (
      <DatePicker
        id={ id }
        name="datepicker"
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

FroodDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  columnName: PropTypes.string,
};

export default FroodDatePicker;
