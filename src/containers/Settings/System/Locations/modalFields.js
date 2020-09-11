// @flow
type FormMenuItems = Array<{
  id: number,
  name: string
}>

export default (
  handleStateSelect: Function,
  states: FormMenuItems,
  cities: FormMenuItems,
  locationTypes: FormMenuItems
) => ({
  newLocation: [{
    header: 'Location Name',
    type: 'text',
    name: 'name',
    editableOnInitialization: true,
  }, {
    header: 'Location Prefix',
    type: 'text',
    editableOnInitialization: false,
    name: 'prefix'
  }, {
    header: 'State',
    type: 'select',
    name: 'stateId',
    editableOnInitialization: true,
    menuItems: states.map(state => ({ key: state.id, value: state.name }))
  }, {
    header: 'City',
    type: 'select',
    name: 'cityId',
    editableOnInitialization: true,
    menuItems: cities.map(city => ({ key: city.id, value: city.name }))
  }, {
    header: 'Suburb',
    type: 'text',
    name: 'suburb',
    editableOnInitialization: true,
  }, {
    header: 'Postal Code',
    type: 'text',
    name: 'postalCode',
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
    header: 'Location Type',
    type: 'select',
    name: 'type',
    editableOnInitialization: false,
    menuItems: locationTypes.map(lt => ({ key: lt.id, value: lt.name }))
  }]
});
