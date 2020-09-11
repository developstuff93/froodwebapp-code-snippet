export default roles => ({
  newUser: [{
    header: 'Name',
    type: 'text',
    name: 'name',
    editableOnInitialization: false,
  }, {
    header: 'Email Address',
    type: 'text',
    name: 'email',
    editableOnInitialization: false,
  }, {
    header: 'Role',
    type: 'select',
    name: 'roleId',
    editableOnInitialization: true,
    menuItems: roles.map(role => ({ key: role.id, value: role.name }))
  }],
  newRole: [{
    header: 'Role',
    type: 'text',
    name: 'name'
  }, {
    header: 'Clone From',
    type: 'select',
    name: 'cloneId',
    menuItems: roles.map(role => ({ key: role.id, value: role.name }))
  }]
});
