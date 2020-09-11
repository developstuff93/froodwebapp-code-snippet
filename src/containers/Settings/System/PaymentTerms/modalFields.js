export default fromFields => (
  [{
    header: 'Term',
    type: 'text',
    name: 'name',
    editableOnInitialization: false,
  }, {
    header: 'Due In Days',
    type: 'text',
    name: 'dueDays',
    editableOnInitialization: true,
  }, {
    header: 'From',
    type: 'select',
    name: 'from',
    editableOnInitialization: true,
    menuItems: fromFields.map(field => ({ key: field.id, value: field.name }))
  }]
);
