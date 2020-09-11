import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import styles from './AutoComplete.scss';

const AutoComplete = ({
  // trigger
  loadingAutoComplete,
  // data
  items,
  value,
  // props
  getItemValue,
  inputRef,
  inputPlaceholder,
  inputStyle = {},
  renderItem,
  alignRight = false,
  disabled = false,
  // handlers
  onChange,
  onSelect,
  onBlur,
  onFocus
}) => (
  <Autocomplete
    ref={ inputRef }
    wrapperStyle={ {
      display: 'block',
      height: '100%',
    } }
    autoHighlight
    selectOnBlur
    items={ items }
    getItemValue={ getItemValue }
    value={ value }
    onChange={ onChange }
    onSelect={ onSelect }
    renderItem={ renderItem }
    renderMenu={ (renderItems, renderValue) => (
      <div style={ { position: 'relative' } }>
        { loadingAutoComplete && <div className={ styles.autoCompleteMenuNoItems }>Loading...</div> }
        {
          !loadingAutoComplete
          && renderItems.length === 0
          && renderValue.length > 2
          && <div className={ styles.autoCompleteMenuNoItems }>No matches for {value}</div>
        }
        {
          !loadingAutoComplete
          && renderItems.length !== 0
          && renderValue.length > 2
          &&
            <div
              className={ styles.autoCompleteMenu }
              style={ { right: alignRight ? 0 : 'auto' } }
            >
              {renderItems}
            </div>
        }
      </div>
    ) }
    inputProps={ {
      lang: 'en',
      placeholder: inputPlaceholder,
      onBlur,
      onFocus,
      className: styles.autoCompleteInput,
      disabled,
      style: {
        ...inputStyle,
        backgroundColor: disabled ? '#f7f7f7' : 'transparent',
        color: disabled ? 'rgba(0, 0, 0, 0.25)' : 'inherit'
      }
    } }
  />
);

AutoComplete.propTypes = {
  // trigger
  loadingAutoComplete: PropTypes.bool.isRequired,
  // data
  items: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  // props
  inputRef: PropTypes.func,
  getItemValue: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  inputStyle: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
  // handlers
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

export default AutoComplete;
