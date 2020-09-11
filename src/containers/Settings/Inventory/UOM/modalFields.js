export default uom => ({
  newUOM: [{
    header: 'Units Of Measurement (UOM)',
    type: 'text',
    name: 'name',
    editableOnInitialization: false,
  }, {
    header: 'UOM Description',
    type: 'text',
    name: 'description',
    editableOnInitialization: true,
  }],
  newConversion: [{
    header: 'Rate',
    type: 'text',
    name: 'fromQty',
    editableOnInitialization: true,
  }, {
    header: 'Unit',
    type: 'text',
    name: 'fromUnit',
    editableOnInitialization: false,
  }, {
    header: 'Rate',
    type: 'text',
    name: 'toQty',
    editableOnInitialization: true,
  }, {
    header: 'Unit',
    type: 'select',
    name: 'toId',
    editableOnInitialization: true,
    menuItems: uom.map(item => ({ key: item.id, value: item.name }))
  }]
});
