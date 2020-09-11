import React from 'react';
import { GridText, GridTags } from 'components';
import { DeleteIcon } from 'icons';
import { crossJoinArrays } from 'utils';
import styles from '../../Item.scss';

export const generateProductVariants = (options) => {
  const values = options.map(option => option.values);
  if (values.length > 1) {
    const variants = crossJoinArrays(values[0], values[1], values[2]);
    return variants.map(variant => ({
      id: variant.join('/'),
      name: variant.join('/'),
      sku: []
    }));
  }
  return [];
};

export const productOptionsColumns = (
  handleSaveOption,
  handleDeleteOption,
  handleAddProductValue,
  handleDeleteProductValue
) => [{
  title: 'Product Option',
  dataIndex: 'key',
  width: '30%',
  render: (text, record, index) => (
    <GridText
      value={ text }
      index={ index }
      handleChange={ handleSaveOption }
    />
  )
}, {
  title: 'Values',
  dataIndex: 'values',
  width: '70%',
  render: (text, record, index) => (
    <div className={ styles.productValues }>
      { record.key &&
        <GridTags
          tags={ record.values }
          index={ index }
          handleAddTag={ handleAddProductValue }
          handleDeleteTag={ handleDeleteProductValue }
        />
      }
      <DeleteIcon
        id={ index }
        onClick={ handleDeleteOption }
      />
    </div>
  )
}];

export const productVariantsColumns = handleSaveSku => [{
  title: 'Product Variant',
  dataIndex: 'name',
  width: '30%'
}, {
  title: 'SKU',
  dataIndex: 'sku',
  width: '70%',
  render: (text, record, index) => (
    <GridText
      value={ text }
      index={ index }
      handleChange={ handleSaveSku }
    />
  )
}];

