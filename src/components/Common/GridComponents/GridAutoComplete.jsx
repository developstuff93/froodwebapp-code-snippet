import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'components';

class GridAutoComplete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: true,
      value: props.value || '',
      autocomplete: props.autocomplete || [],
      index: props.index
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      autocomplete: nextProps.autocomplete || [],
      index: nextProps.index
    });
  }

  onBlur = () => {
    this.setState({ inputVisible: false });
  }

  onChange = (e, value) => {
    if (value.length < 3) {
      this.setState({
        autocomplete: [],
        value
      });
    } else {
      this.setState({ value },
        () => {
          this.props.onChange(value);
        });
    }
  }

  onSelect = (id, item) => {
    this.setState({
      value: item.data.name,
      inputVisible: false
    },
    () => this.props.onSelect({ id: item.data.id, name: item.data.name }, this.state.index));
  }

  onFocus = () => {
    if (this.state.value) {
      this.props.onChange(this.state.value);
    }
  }

  getInputRef = (el) => {
    this.input = el;
  }

  handleShowInput = () => {
    this.setState(
      { inputVisible: true },
      () => this.input.focus()
    );
  }

  render() {
    const {
      inputVisible,
      value
    } = this.state;

    const {
      autocomplete,
      loadingAutoComplete,
      renderItem,
      getItemValue
    } = this.props;

    return (
      <div>
        {
          !inputVisible && value &&
          <div onDoubleClick={ this.handleShowInput }>{ value }</div>
        }
        <div style={ { display: inputVisible ? 'block' : 'none' } }>
          <AutoComplete
            inputRef={ this.getInputRef }
            items={ autocomplete }
            getItemValue={ getItemValue }
            value={ value }
            onChange={ this.onChange }
            onSelect={ this.onSelect }
            // onBlur={ this.onBlur }
            onFocus={ this.onFocus }
            renderItem={ renderItem }
            loadingAutoComplete={ loadingAutoComplete }
            inputPlaceholder="Search..."
          />
        </div>
      </div>
    );
  }
}

GridAutoComplete.propTypes = {
  value: PropTypes.string,
  autocomplete: PropTypes.array,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  loadingAutoComplete: PropTypes.bool.isRequired,
  renderItem: PropTypes.func,
  getItemValue: PropTypes.func,
};

export default GridAutoComplete;
