import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import addActionsToSagas from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const ORDER_INFO_GET = createRequestTypes('ORDER_INFO_GET');
export const ORDER_SAVE = createRequestTypes('ORDER_SAVE');
export const ORDER_UPDATE = createRequestTypes('ORDER_UPDATE');
export const ORDER_CUSTOMER_SEARCH = createRequestTypes('ORDER_CUSTOMER_SEARCH');
export const ORDER_SALES_PERSON_SEARCH = createRequestTypes('ORDER_SALES_PERSON_SEARCH');
export const ORDER_CUSTOMER_INFO_GET = createRequestTypes('ORDER_CUSTOMER_INFO_GET');
export const ORDER_SKU_SEARCH = createRequestTypes('ORDER_SKU_SEARCH');
export const ORDER_SKU_INFO_GET = createRequestTypes('ORDER_SKU_INFO_GET');

// ------------------------Action creators---------------
export const orderInfoGetRequest = createRequestFunc(ORDER_INFO_GET, 'order?id={orderNo}');
export const orderSaveRequest = createRequestFunc(ORDER_SAVE, 'order');
export const orderUpdateRequest = createRequestFunc(ORDER_UPDATE, 'order');
export const searchCustomerRequest = createRequestFunc(ORDER_CUSTOMER_SEARCH, 'customers/search?keyword=filter&from=0&limit=10');
export const searchSalesPersonSearchRequest = createRequestFunc(ORDER_SALES_PERSON_SEARCH, 'users?name=filter&from=0&limit=10');
export const customerInfoGetRequest = createRequestFunc(ORDER_CUSTOMER_INFO_GET, 'customer?id={id}');
export const searchSkuRequest = createRequestFunc(ORDER_SKU_SEARCH, 'skus/hint?keyword=filter&from=0&limit=10');
export const skuInfoGetRequest = createRequestFunc(ORDER_SKU_INFO_GET, 'skus?');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  ORDER_INFO_GET,
  ORDER_SAVE,
  ORDER_UPDATE,
  ORDER_CUSTOMER_SEARCH,
  ORDER_SALES_PERSON_SEARCH,
  ORDER_CUSTOMER_INFO_GET,
  ORDER_SKU_SEARCH,
  ORDER_SKU_INFO_GET
]);
