export default zoneTypes => [{
  header: 'Zone',
  type: 'select',
  name: 'zoneId',
  editableOnInitialization: false,
  menuItems: zoneTypes.map(item => ({ key: item.id, value: item.name }))
}, {
  header: 'Bin Name',
  type: 'text',
  name: 'name',
  editableOnInitialization: false,
}, {
  header: 'Description',
  type: 'text',
  name: 'description',
  editableOnInitialization: true,
}];
