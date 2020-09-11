// @flow
type FormMenuItems = Array<{
  id: number,
  name: string
}>

export default (
  states: FormMenuItems,
  cities: FormMenuItems,
  locationTypes: FormMenuItems,
) => (
  [{
    header: 'Location Name',
    type: 'text',
    name: 'name',
    editableOnInitialization: false,
  }, {
    header: 'Location Prefix',
    type: 'text',
    name: 'prefix',
    editableOnInitialization: false,
  }, {
    header: 'Postal Code',
    type: 'text',
    name: 'postalCode',
    editableOnInitialization: true,
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
    menuItems: locationTypes.map(type => ({ key: type.id, value: type.name }))
  }]
);
