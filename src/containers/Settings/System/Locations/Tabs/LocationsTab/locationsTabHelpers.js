export default [{
  title: 'Name',
  dataIndex: 'name'
}, {
  title: 'Address',
  dataIndex: 'address',
  render: (text, { address1, address2, suburb, cityName, stateName }) => (
    `${address1 || ''}, ${address2 || ''}, ${suburb || ''}, ${cityName || ''}, ${stateName || ''}`
  )
}, {
  title: 'Active',
  dataIndex: 'isActive',
  type: 'checkbox'
}, {
  title: 'Default',
  dataIndex: 'isDefault',
  type: 'checkbox'
}, {
  title: 'Holds Stock',
  dataIndex: 'holdStock',
  type: 'checkbox'
}, {
  title: 'Actions',
  dataIndex: 'actions',
  type: 'modalButton',
  text: 'Edit'
}];
