export default (taxCodes, handleFormatter, handleParser) => ({
  newCode: [{
    header: 'Tax Name',
    type: 'text',
    name: 'name',
    editableOnInitialization: false,
  }, {
    header: 'Tax Code',
    type: 'text',
    name: 'code',
    editableOnInitialization: false,
  }, {
    header: 'Tax Amount',
    type: 'number',
    name: 'rate',
    formatter: handleFormatter,
    parser: handleParser,
    editableOnInitialization: true,
  }],
  newCategory: [{
    header: 'Tax Name',
    type: 'text',
    name: 'name',
    editableOnInitialization: false,
  }, {
    header: 'Buy Tax Code',
    type: 'select',
    name: 'buyRate',
    editableOnInitialization: true,
    menuItems: taxCodes.map(cat => ({ key: cat.id, value: cat.code }))
  }, {
    header: 'Sell Tax Code',
    type: 'select',
    name: 'sellRate',
    editableOnInitialization: true,
    menuItems: taxCodes.map(cat => ({ key: cat.id, value: cat.code }))
  }]
});
