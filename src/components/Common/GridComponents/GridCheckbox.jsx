import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

class GridCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || false,
      index: props.index
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || false,
      index: nextProps.index
    });
  }

  handleChange = () => {
    this.props.handleChange(!this.state.value, this.state.index, this.props.propName);
  }

  render() {
    const { value, readonly } = this.props;
    return (
      <Checkbox
        checked={ value }
        disabled={ readonly }
        onChange={ this.handleChange }
      />
    );
  }
}

GridCheckBox.propTypes = {
  value: PropTypes.bool,
  index: PropTypes.number.isRequired,
  readonly: PropTypes.bool,
  propName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default GridCheckBox;
