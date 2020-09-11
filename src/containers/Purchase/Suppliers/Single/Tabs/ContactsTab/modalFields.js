export default locations => [{
  header: 'Location',
  type: 'select',
  name: 'locationId',
  editableOnInitialization: true,
  menuItems: locations.map(location => ({ key: location.id, value: location.name }))
}, {
  header: 'First Name',
  type: 'text',
  name: 'firstName',
  editableOnInitialization: true,
}, {
  header: 'Last Name',
  type: 'text',
  name: 'lastName',
  editableOnInitialization: true,
}, {
  header: 'Phone Number',
  type: 'text',
  name: 'phone',
  editableOnInitialization: true,
}, {
  header: 'Fax',
  type: 'text',
  name: 'fax',
  editableOnInitialization: true,
}, {
  header: 'Email',
  type: 'text',
  name: 'email',
  editableOnInitialization: true,
}, {
  header: 'Corporate Title',
  type: 'text',
  name: 'title',
  editableOnInitialization: true,
}, {
  header: 'Make this default contact',
  type: 'checkbox',
  name: 'isDefault',
  editableOnInitialization: true,
}, {
  header: 'Include in all emails',
  type: 'checkbox',
  name: 'includeInEmails',
  editableOnInitialization: true,
}];
