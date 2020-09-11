/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { FroodBlurInput, FroodDatePicker } from 'components';

const getComponentByType = (type, id, value, handleInputChange, handleDatePickerChange) => {
  switch (true) {
    case type === 'datetime':
      return (
        <div style={ { minWidth: '7rem' } }>
          <FroodDatePicker
            id={ id.toString() }
            onChange={ handleDatePickerChange }
            value={ value }
          />
        </div>
      );
    case type.includes('varchar'):
      return (
        <FroodBlurInput
          id={ id }
          value={ value }
          handleInputChange={ handleInputChange }
        />);
    default:
      return <div />;
  }
};

export default getComponentByType;
