import {
  createRequestTypes,
  createRequestFunc,
} from 'utils';
import addActionsToSagas from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants--------------
export const SKU_SEARCH = createRequestTypes('SKU_SEARCH');

// ------------------------Action creators---------------
export const skuSearchGetRequest = createRequestFunc(SKU_SEARCH, 'skus/hint?keyword=filter&from=0&limit=10');

addActionsToSagas([
  SKU_SEARCH,
]);
