// @flow
type FormMenuItems = Array<{
  id: number,
  name: string
}>

export default (
  handleStateSelect: Function,
  states: FormMenuItems,
  cities: FormMenuItems
) => ([{
  header: 'Label',
  type: 'text',
  name: 'label',
  editableOnInitialization: true,
}, {
  header: 'Postal Code',
  type: 'text',
  name: 'postalCode',
  editableOnInitialization: true,
}, {
  header: 'State',
  type: 'select',
  name: 'state',
  editableOnInitialization: true,
  menuItems: states.map(state => ({ key: state.id, value: state.name }))
}, {
  header: 'City',
  type: 'select',
  name: 'city',
  editableOnInitialization: true,
  menuItems: cities.map(city => ({ key: city.id, value: city.name }))
}, {
  header: 'Suburb',
  type: 'text',
  name: 'suburb',
  editableOnInitialization: true,
}, {
  header: 'Address Line 1',
  type: 'text',
  name: 'address1',
  editableOnInitialization: true,
}, {
  header: 'Address Line 2',
  type: 'text',
  name: 'address2',
  editableOnInitialization: true,
}, {
  header: 'Make this default address',
  type: 'checkbox',
  name: 'isDefault',
  editableOnInitialization: true
}]);
