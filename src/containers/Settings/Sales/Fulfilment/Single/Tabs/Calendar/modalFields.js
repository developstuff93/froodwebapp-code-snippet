export default isEditableDeliveries => ({
  newSlot: [{
    header: 'From',
    type: 'timePicker',
    name: 'from',
    editableOnInitialization: true,
  }, {
    header: 'To',
    type: 'timePicker',
    name: 'to',
    editableOnInitialization: true,
  }, {
    header: 'Delivery Limit',
    type: 'checkbox',
    name: 'isDeliveryLimited',
    editableOnInitialization: true,
  }, {
    header: 'Number Of Deliveries',
    type: 'number',
    name: 'deliveries',
    editableOnInitialization: isEditableDeliveries,
  }],
  editSlot: [{
    header: 'Delivery Limit',
    type: 'checkbox',
    name: 'isDeliveryLimited',
    editableOnInitialization: true,
  }, {
    header: 'Number Of Deliveries',
    type: 'number',
    name: 'deliveries',
    editableOnInitialization: isEditableDeliveries,
  }]
});
