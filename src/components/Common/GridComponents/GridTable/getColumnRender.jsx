import React from 'react';
import { GridText, GridCheckbox, GridButton } from 'components';

const getColumnRender = (
  expandable,
  readonly,
  type,
  column,
  handleEditCell,
  handleModalButtonClick
) => {
  switch (type) {
    case 'number':
      return (text, record, index) => {
        if (expandable && record.lineNo && !readonly) {
          return (
            <GridText
              value={ text }
              index={ record.lineNo }
              min={ column.min }
              type="number"
              propName={ column.dataIndex }
              handleChange={ handleEditCell }
            />
          );
        } else if ((expandable && !record.lineNo) || readonly) {
          return text;
        }

        return (
          <GridText
            value={ text }
            index={ index }
            min={ column.min }
            type="number"
            propName={ column.dataIndex }
            handleChange={ handleEditCell }
          />
        );
      };
    case 'text':
      return (
        (text, record, index) => {
          if (expandable && record.lineNo && !readonly) {
            return (
              <GridText
                value={ text }
                index={ record.lineNo }
                propName={ column.dataIndex }
                handleChange={ handleEditCell }

              />
            );
          } else if ((expandable && !record.lineNo) || readonly) {
            return text;
          }

          return (
            <GridText
              value={ text }
              index={ index }
              propName={ column.dataIndex }
              handleChange={ handleEditCell }
            />
          );
        }
      );
    case 'checkbox':
      return (
        (text, record, index) => {
          if (expandable && record.lineNo) {
            return (
              <GridCheckbox
                index={ record.lineNo }
                value={ text }
                readonly={ readonly }
                propName={ column.dataIndex }
                handleChange={ handleEditCell }
              />
            );
          }

          return (
            <GridCheckbox
              index={ index }
              value={ text }
              readonly={ readonly }
              propName={ column.dataIndex }
              handleChange={ handleEditCell }
            />
          );
        }
      );
    case 'modalButton':
      return (
        (text, record, index) => (
          <GridButton
            text={ column.text }
            index={ index }
            propName={ column.dataIndex }
            handleClick={ handleModalButtonClick }
          />
        ));
    default:
      return null;
  }
};

export default getColumnRender;
