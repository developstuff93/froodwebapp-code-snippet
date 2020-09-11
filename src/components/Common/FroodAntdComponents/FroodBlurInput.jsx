import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class FroodBlurInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  onBlur = (e) => {
    this.props.handleInputChange(e);
  }

  render() {
    const { value } = this.state;
    const { id } = this.props;

    return (
      <Input
        id={ id.toString() }
        placeholder="Value.."
        size="default"
        value={ value }
        onChange={ this.onChange }
        onBlur={ this.onBlur }
      />
    );
  }
}

FroodBlurInput.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
};

export default FroodBlurInput;
