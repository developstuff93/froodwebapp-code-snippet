import {
  getMainContainerActions,
  getMainContainerActionsCreators,
  createRequestFunc
} from 'utils';

// ------------------------Action constants---------------
export const ORDERS = getMainContainerActions('ORDERS');

// ------------------------Action creators---------------
export const ordersGetInvoiceRequest = createRequestFunc(ORDERS.DOWNLOAD_ITEM, 'sales/invoice?orderNo={orderNo}', 'arraybuffer');
export const ORDERS_REQUESTS = getMainContainerActionsCreators(ORDERS, 'sales');
