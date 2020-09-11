/* eslint-disable indent */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// common
import login from './login';
import error from './error';
import success from './success';
import download from './download';
import commonData from './commonData';
import autocomplete from './autocomplete';

// sales
  // orders
  import orders from './sales/orders';
  import order from './sales/order/order';
  // promotions
  import promotions from './sales/promotions';
  import promotion from './sales/promotion';
  // customers
  import customers from './sales/customers';
  import customer from './sales/customer';
  import customerProfile from './sales/customerProfile';


// inventory
  // items
  import items from './inventory/items';
  import item from './inventory/item';
  // adjustments
  import adjustments from './inventory/adjustments';
  import adjustment from './inventory/adjustment';

// purchase
  // orders
  import purchaseOrders from './purchase/purchaseOrders';
  import purchaseOrder from './purchase/order/order';
  // suppliers
  import suppliers from './purchase/suppliers';
  import supplier from './purchase/supplier';

// settings
  // sales
  import transporters from './settings/sales/fulfilment';
  import channels from './settings/sales/channels';
  // inventory
  import productCategories from './settings/inventory/productCategories';
  import uom from './settings/system/uom';
  import numeric from './settings/system/numericPage';
  // system
  import users from './settings/system/users';
  import locations from './settings/system/locations';
  import paymentTerms from './settings/system/paymentTerms';
  import taxes from './settings/system/taxes';
  import priceLists from './settings/system/priceLists';
  import priceList from './settings/system/priceList';


export default combineReducers({
  router: routerReducer,
  form: formReducer,
  error,
  login,
  success,
  download,
  commonData,
  autocomplete,

  // sales
    // orders
    orders,
    order,
    // promotions
    promotions,
    promotion,
    // customers
    customers,
    customer,
    customerProfile,

  // inventory
    // items
    items,
    item,
    // adjustments
    adjustment,
    adjustments,


  // purchase
    // orders
    purchaseOrders,
    purchaseOrder,
    // suppliers
    suppliers,
    supplier,

  // settings
    // sales
    transporters,
    channels,
    // inventory
    productCategories,
    numeric,
    uom,
    // system
    users,
    taxes,
    locations,
    priceLists,
    priceList,
    paymentTerms,
});
