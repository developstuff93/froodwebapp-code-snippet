/* eslint-disable indent */
// common
export * from './commonDataFlow';
export * from './loginFlow';
export * from './helpersFlow';
export * from './autocompleteFlow';
// sales
  // orders
  export * from './sales/ordersFlow';
  export * from './sales/orderFlow/orderFlow';
  export * from './sales/orderFlow/orderTabsFlow';
  // promotions
  export * from './sales/promotionsFlow';
  export * from './sales/promotionFlow';
  // customers
  export * from './sales/customersFlow';
  export * from './sales/customerFlow';

// inventory
  // items
  export * from './inventory/itemsFlow';
  export * from './inventory/itemFlow';
  // adjustments
  export * from './inventory/adjustmentFlow';
  export * from './inventory/adjustmentsFlow';

// purchase
  // orders
  export * from './purchase/ordersFlow';
  export * from './purchase/orderFlow/orderFlow';
  export * from './purchase/orderFlow/orderTabsFlow';
  // suppliers
  export * from './purchase/suppliersFlow';
  export * from './purchase/supplierFlow';

// settings
  // sales
  export * from './settings/sales/fulfilmementFlow';
  export * from './settings/sales/channelsFlow';
  // inventory
  export * from './settings/inventory/productCategoriesFlow';
  export * from './settings/system/uomFlow';
  export * from './settings/system/numericFlow';
  // system
  export * from './settings/system/usersFlow';
  export * from './settings/system/locationsFlow';
  export * from './settings/system/paymentTermsFlow';
  export * from './settings/system/taxFlow';
  export * from './settings/system/priceListFlow';
  export * from './settings/system/priceListsFlow';
