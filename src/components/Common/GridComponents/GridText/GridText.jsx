import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class GridText extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: true,
      value: props.value.toString() || '',
      index: props.index
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value.toString() || '',
      index: nextProps.index
    });
  }

  handleToggleInput = () => {
    if (!this.props.readonly) {
      this.setState({
        inputVisible: !this.state.inputVisible
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleInputSave = (e) => {
    e.preventDefault(); // could create a bug when used inside form and enter is pressed
    if (this.state.value) {
      this.setState({
        inputVisible: false,
      }, () => this.props.handleChange(this.state.value, this.state.index, this.props.propName));
    }
  }

  render() {
    const {
      inputVisible,
      value
    } = this.state;

    const {
      type = 'text',
      min,
      readonly,
      suffix
    } = this.props;

    return (
      <div>
        {
          !inputVisible && value &&
          <span onDoubleClick={ this.handleToggleInput }>{ value } { suffix }</span>
        }
        { inputVisible && (
          <Input
            autoFocus
            type={ type }
            min={ min }
            size="small"
            style={ { width: 150 } }
            value={ value }
            disabled={ readonly }
            onChange={ this.handleInputChange }
            onBlur={ this.handleInputSave }
            onPressEnter={ this.handleInputSave }
          />
        )}
      </div>
    );
  }
}

GridText.propTypes = {
  min: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.any,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  propName: PropTypes.string,
  readonly: PropTypes.bool,
  suffix: PropTypes.string,
};

export default GridText;
