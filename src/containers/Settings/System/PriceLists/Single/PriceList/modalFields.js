export default isNewSku => [{
  header: 'SKU/Variant',
  type: 'skuAutocomplete',
  name: 'skuId',
  editableOnInitialization: isNewSku,
}, {
  header: 'UOM',
  type: 'text',
  name: 'uomName',
  editableOnInitialization: false,
}, {
  header: 'Currency',
  type: 'text',
  name: 'currencyName',
  editableOnInitialization: false,
}, {
  header: 'Price (Include Tax or Exclude Tax)',
  type: 'text',
  name: 'price',
  editableOnInitialization: true,
}];
