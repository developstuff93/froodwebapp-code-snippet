import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (isNaN(nextProps.input.value)) {
      this.setState({
        value: nextProps.input.value
      });
    } else {
      const item = nextProps.menuItems.find(mi => mi.key.toString() === nextProps.input.value.toString());
      this.setState({
        value: (item && item.value.toString()) || ''
      });
    }
  }

  onSelect = (value) => {
    this.props.input.onChange(value);
  }

  onChange = (value) => {
    this.props.input.onChange(value);
  }

  filterOption = (inputValue, option) => {
    if (option.props.children.toLowerCase().includes(inputValue.toLowerCase())) return true;
    return false;
  }

  render() {
    const {
      value
    } = this.state;

    const {
      menuItems = [],
      placeholder,
      mode,
      disabled = false
    } = this.props;

    return (
      <Select
        value={ value.toString() }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        mode={ mode }
        placeholder={ placeholder }
        filterOption={ this.filterOption }
        disabled={ disabled }
        style={ { width: '100%' } }
      >
        { menuItems.map(item => (
          <Select.Option
            key={ item.key.toString() }
            value={ item.key.toString() }
          >
            { item.value }
          </Select.Option>
        )) }
      </Select>
    );
  }
}

FormSelect.propTypes = {
  input: PropTypes.object.isRequired,
  menuItems: PropTypes.array,
  placeholder: PropTypes.string,
  mode: PropTypes.string,
  disabled: PropTypes.bool,
};

export default FormSelect;
