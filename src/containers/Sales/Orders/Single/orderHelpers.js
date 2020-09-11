export const getOrderNo = (pathname) => {
  const pathnames = pathname.split('/');
  return pathnames[pathnames.length - 1].replace(/-/g, '/');
};

export const prepareOrder = formData => ({
  addresses: {
    shippingAddressId: (formData.addresses && formData.addresses.shippingAddressId)
                    || formData.shippingAddress.id
  },
  channelId: formData.channel.id,
  customerId: formData.customer.id,
  customerNotes: formData.customerNotes,
  deliveryDate: formData.deliveryDate,
  deliveryMethodId: formData.deliveryMethodId,
  deliverySlotId: formData.deliverySlotId,
  orderNo: formData.orderNo,
  promoCode: formData.promoCode,
  skuDetails: formData.skuDetails.map(skuDetail => ({
    id: skuDetail.id,
    qty: skuDetail.qty,
    discount: skuDetail.discount,
  })),
  termsAndCondition: formData.termsAndCondition
});

const canBeEditedUntilPickedStatuses = [
  'Confirmed',
  'Backorder',
  'Partial Allocated',
  'Allocated',
  'Pick Progress',
  'Picked'
];

const canBeEditedUntilAllocatedStatuses = [
  'Confirmed',
  'Backorder',
  'Partial Allocated',
  'Allocated'
];

export const canBeEditedUntilPicked = status => (
  canBeEditedUntilPickedStatuses.includes(status)
);

export const canBeEditedUntilAllocated = status => (
  canBeEditedUntilAllocatedStatuses.includes(status)
);
