import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'components';

const getItemValue = item => item.data.id.toString();

class FormAutocomplete extends Component {
  onChange = (e, value) => {
    this.props.input.onChange(value);
    if (value.length >= 3) {
      this.props.onAutocompleteChange(value);
    }
  }

  onSelect = (id) => {
    if (this.props.input.value !== id) {
      this.props.input.onChange(id);
    }
  }

  onFocus = () => {
    if (this.props.input.value) {
      this.props.onAutocompleteChange(this.props.input.value);
    }
  }

  render() {
    const {
      input: { value },
      placeholder,
      loadingAutoComplete,
      autocomplete,
      renderItem,
      alignRight = false,
      disabled = false
    } = this.props;

    return (
      <AutoComplete
        items={ autocomplete }
        getItemValue={ getItemValue }
        value={ value }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        onFocus={ this.onFocus }
        renderItem={ renderItem }
        loadingAutoComplete={ loadingAutoComplete }
        inputPlaceholder={ placeholder }
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

FormAutocomplete.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  loadingAutoComplete: PropTypes.bool.isRequired,
  autocomplete: PropTypes.array.isRequired,
  onAutocompleteChange: PropTypes.func.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormAutocomplete;
