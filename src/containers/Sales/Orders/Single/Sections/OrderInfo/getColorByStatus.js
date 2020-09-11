const colorsByStatus = [{
  color: '#34A5DA',
  status: 'Draft',
}, {
  color: '#4C8945',
  status: 'Confirmed'
}, {
  color: '#838787',
  status: 'Backorder'
}, {
  color: '#F96928',
  status: 'Allocated'
}, {
  color: '#FF9300',
  status: 'Partial Allocated'
}, {
  color: '#0096FF',
  status: 'Pick Progress'
}, {
  color: '#0433FF',
  status: 'Picked'
}, {
  color: '#9437FF',
  status: 'Pack Progress'
}, {
  color: '#FF2F92',
  status: 'Packed'
}, {
  color: '#FF7E79',
  status: 'Shipped'
}, {
  color: '#000000',
  status: 'Delivered'
}, {
  color: '#C0C0C0',
  status: 'Invoiced'
}, {
  color: '#929292',
  status: 'Payment Progress'
}, {
  color: '#5E5E5E',
  status: 'Paid'
}, {
  color: '#FF2600',
  status: 'Failed Payment'
}];

export default (status) => {
  const colorItem = colorsByStatus.find(item => item.status === status);

  return colorItem ? colorItem.color : 'black';
};
