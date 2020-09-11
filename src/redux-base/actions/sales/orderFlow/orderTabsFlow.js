import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import addActionsToSagas from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const ORDER_GET_PICK_DATA = createRequestTypes('ORDER_GET_PICK_DATA');
export const ORDER_UPDATE_PICK_DATA = createRequestTypes('ORDER_UPDATE_PICK_DATA');

export const ORDER_GET_ALLOCATION_DATA = createRequestTypes('ORDER_GET_ALLOCATION_DATA');
export const ORDER_UPDATE_ALLOCATION_DATA = createRequestTypes('ORDER_UPDATE_ALLOCATION_DATA');

export const ORDER_GET_PACK_DATA = createRequestTypes('ORDER_GET_PACK_DATA');
export const ORDER_UPDATE_PACK_DATA = createRequestTypes('ORDER_UPDATE_PACK_DATA');

export const ORDER_GET_SHIP_DATA = createRequestTypes('ORDER_GET_SHIP_DATA');
export const ORDER_UPDATE_SHIP_DATA = createRequestTypes('ORDER_UPDATE_SHIP_DATA');

export const ORDER_GET_INVOICE_DATA = createRequestTypes('ORDER_GET_INVOICE_DATA');

// ------------------------Action creators---------------
export const orderGetPickData = createRequestFunc(ORDER_GET_PICK_DATA, 'order/pick?orderNo={orderNo}');
export const orderUpdatePickData = createRequestFunc(ORDER_UPDATE_PICK_DATA, 'order/pick');

export const orderGetPackData = createRequestFunc(ORDER_GET_PACK_DATA, 'order/pack?orderNo={orderNo}');
export const orderUpdatePackData = createRequestFunc(ORDER_UPDATE_PACK_DATA, 'order/pack');

export const orderGetShipData = createRequestFunc(ORDER_GET_SHIP_DATA, 'order/ship?orderNo={orderNo}');
export const orderUpdateShipData = createRequestFunc(ORDER_UPDATE_SHIP_DATA, 'order/ship');

export const orderGetInvoiceData = createRequestFunc(ORDER_GET_INVOICE_DATA, 'order/invoice?orderNo={orderNo}');

export const orderGetAllocationData = createRequestFunc(ORDER_GET_ALLOCATION_DATA, 'order/allocation?orderNo={orderNo}');
export const orderUpdateAllocationData = createRequestFunc(ORDER_UPDATE_ALLOCATION_DATA, 'order/allocation');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  ORDER_GET_PICK_DATA,
  ORDER_UPDATE_PICK_DATA,

  ORDER_GET_ALLOCATION_DATA,
  ORDER_UPDATE_ALLOCATION_DATA,

  ORDER_GET_PACK_DATA,
  ORDER_UPDATE_PACK_DATA,

  ORDER_GET_SHIP_DATA,
  ORDER_UPDATE_SHIP_DATA,

  ORDER_GET_INVOICE_DATA
]);
