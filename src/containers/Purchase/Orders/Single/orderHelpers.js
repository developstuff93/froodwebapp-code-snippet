export const prepareOrder = formData => ({
  billToCompany: {
    id: '',
    locationId: formData.billingAddress.id,
  },
  shipToCompany: {
    id: '',
    locationId: formData.shippingAddress.id,
  },
  vendor: formData.vendor,
  date: formData.date,
  deliveryDate: formData.deliveryDate,
  contactUserId: formData.contactUserId,
  shippingMethodId: formData.shippingMethodId,
  details: formData.details.map(skuDetail => ({
    sku: skuDetail.sku,
    qty: Number(skuDetail.qty) || 0,
    discount: Number(skuDetail.discount) || 0,
  })),
  vendorNotes: formData.vendorNotes,
  internalNotes: formData.internalNotes,
  shipping: Number(formData.shipping || 0),
  adjustment: Number(formData.adjustment || 0)
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
