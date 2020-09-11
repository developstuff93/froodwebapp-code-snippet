export default zoneTypes => [{
  header: 'Zone Name',
  type: 'text',
  name: 'name',
  editableOnInitialization: true,
}, {
  header: 'Zone Type',
  type: 'select',
  name: 'type',
  editableOnInitialization: false,
  menuItems: zoneTypes.map(item => ({ key: item.id, value: item.name }))
}];
