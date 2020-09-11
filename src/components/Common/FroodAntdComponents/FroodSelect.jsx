import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class FroodSelect extends Component {

  onChange = (value) => {
    this.props.onChange(this.props.id, value);
  }

  render() {
    const {
      menuItems = [],
      className
    } = this.props;
    return (
      <Select
        className={ className }
        onChange={ this.onChange }
      >
        { menuItems.map(item => (
          <Select.Option
            key={ item.id }
            value={ item.id }
          >
            { item.name }
          </Select.Option>
        ))}
      </Select>
    );
  }
}

FroodSelect.propTypes = {
  className: PropTypes.string,
  menuItems: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FroodSelect;
