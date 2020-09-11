import {
  createRequestTypes,
  createRequestFunc
} from 'utils';
import addActionsToSagas from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const CUSTOMER_NEW_SAVE = createRequestTypes('CUSTOMER_NEW_SAVE');
export const CUSTOMER_PROFILE_GET = createRequestTypes('CUSTOMER_PROFILE_GET');
export const CUSTOMER_PROFILE_UPDATE = createRequestTypes('CUSTOMER_PROFILE_UPDATE');
export const CUSTOMER_ADDRESSES_GET = createRequestTypes('CUSTOMER_ADDRESSES_GET');
export const CUSTOMER_ADDRESSES_SAVE = createRequestTypes('CUSTOMER_ADDRESSES_SAVE');
export const CUSTOMER_ADDRESSES_UPDATE = createRequestTypes('CUSTOMER_ADDRESSES_UPDATE');
export const CUSTOMER_ADDRESSES_DELETE = createRequestTypes('CUSTOMER_ADDRESSES_DELETE');
export const CUSTOMER_ORDERS_GET = createRequestTypes('CUSTOMER_ORDERS_GET');
export const CUSTOMER_ORDERS_SEARCH = createRequestTypes('CUSTOMER_ORDERS_SEARCH');

// ------------------------Action creators---------------
export const customerNewRequest = createRequestFunc(CUSTOMER_NEW_SAVE, 'customer');
export const customerProfileGetRequest = createRequestFunc(CUSTOMER_PROFILE_GET, 'customer/{id}');
export const customerProfileUpdateRequest = createRequestFunc(CUSTOMER_PROFILE_UPDATE, 'customer');
export const customerAddressesGetRequest = createRequestFunc(CUSTOMER_ADDRESSES_GET, 'customer/{id}/addresses');
export const customerAddressSaveRequest = createRequestFunc(CUSTOMER_ADDRESSES_SAVE, 'customer/{id}/addresses');
export const customerAddressUpdateRequest = createRequestFunc(CUSTOMER_ADDRESSES_UPDATE, 'customer/{id}/addresses');
export const customerAddressDeleteRequest = createRequestFunc(CUSTOMER_ADDRESSES_DELETE, 'customer/{id}/addresses/{addressId}');
export const customerOrdersGetRequest = createRequestFunc(CUSTOMER_ORDERS_GET, 'customer/{id}/orders');
export const customerOrderSearchRequest = createRequestFunc(CUSTOMER_ORDERS_SEARCH, 'customer/{id}/orders?orderNo=filter&from=0&limit=10');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  CUSTOMER_NEW_SAVE,
  CUSTOMER_PROFILE_GET,
  CUSTOMER_PROFILE_UPDATE,
  CUSTOMER_ADDRESSES_GET,
  CUSTOMER_ADDRESSES_SAVE,
  CUSTOMER_ADDRESSES_UPDATE,
  CUSTOMER_ADDRESSES_DELETE,
  CUSTOMER_ORDERS_GET,
  CUSTOMER_ORDERS_SEARCH
]);
