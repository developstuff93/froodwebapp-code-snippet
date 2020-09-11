import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import addActionsToSagas from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const PURCHASE_ORDER_GET_PARALLEL = createRequestTypes('PURCHASE_ORDER_GET_PARALLEL');
export const PURCHASE_ORDER_SAVE = createRequestTypes('PURCHASE_ORDER_SAVE');
export const PURCHASE_ORDER_UPDATE = createRequestTypes('PURCHASE_ORDER_UPDATE');
export const PURCHASE_ORDER_FIELDS_GET_PARALLEL = createRequestTypes('PURCHASE_ORDER_FIELDS_GET_PARALLEL');

export const PURCHASE_ORDER_SUPPLIER_SEARCH = createRequestTypes('PURCHASE_ORDER_SUPPLIER_SEARCH');
export const PURCHASE_ORDER_SKU_SEARCH = createRequestTypes('PURCHASE_ORDER_SKU_SEARCH');
export const PURCHASE_ORDER_SKU_INFO_GET = createRequestTypes('PURCHASE_ORDER_SKU_INFO_GET');

// ------------------------Action creators---------------
export const purchaseOrderSaveRequest = createRequestFunc(PURCHASE_ORDER_SAVE, 'purchase/draft');
export const purchaseOrderUpdateRequest = createRequestFunc(PURCHASE_ORDER_UPDATE, 'purchase/{id}/amend');
export const purchaseOrderGetRequest = createParallelRequestFunc(PURCHASE_ORDER_GET_PARALLEL, ['purchase/{id}', 'purchase/company/locations', 'purchase/contact/users']);
export const purchaseOrderFieldsGetRequest = createParallelRequestFunc(PURCHASE_ORDER_FIELDS_GET_PARALLEL, ['purchase/company/locations', 'purchase/contact/users']);

export const purchaseOrderSearchSupplierRequest = createRequestFunc(PURCHASE_ORDER_SUPPLIER_SEARCH, 'vendors/search?keyword=filter&from=0&limit=10');
export const purchaseOrderSearchSkuRequest = createRequestFunc(PURCHASE_ORDER_SKU_SEARCH, 'skus/hint?keyword=filter&vendorId={vendorId}&from=0&limit=10');
export const purchaseOrderSkuInfoGetRequest = createRequestFunc(PURCHASE_ORDER_SKU_INFO_GET, 'skus?id={id}');


addActionsToSagas([
  PURCHASE_ORDER_GET_PARALLEL,
  PURCHASE_ORDER_SAVE,
  PURCHASE_ORDER_UPDATE,
  PURCHASE_ORDER_FIELDS_GET_PARALLEL,
  PURCHASE_ORDER_SUPPLIER_SEARCH,
  PURCHASE_ORDER_SKU_SEARCH,
  PURCHASE_ORDER_SKU_INFO_GET
]);
