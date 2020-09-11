import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import addActionsToSagas from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const ITEM_INFO_GET = createRequestTypes('ITEM_INFO_GET');
export const ITEM_INFO_SAVE = createRequestTypes('ITEM_INFO_SAVE');
export const ITEM_INFO_UPDATE = createRequestTypes('ITEM_INFO_UPDATE');

// export const ITEM_SKU_AND_BINS_GET = createRequestTypes('ITEM_SKU_AND_BINS_GET');
// export const ITEM_SKU_BINS_GET = createRequestTypes('ITEM_SKU_BINS_GET');
// export const ITEM_SKU_BINS_SAVE = createRequestTypes('ITEM_SKU_BINS_SAVE');
// export const ITEM_SKU_BINS_UPDATE = createRequestTypes('ITEM_SKU_BINS_UPDATE');
// export const ITEM_SKU_BINS_DELETE = createRequestTypes('ITEM_SKU_BINS_DELETE');
// export const ITEM_BINS_GET = createRequestTypes('ITEM_BINS_GET');
// export const ITEM_SKU_UOM_GET = createRequestTypes('ITEM_SKU_UOM_GET');
// export const ITEM_SKU_UOM_SAVE = createRequestTypes('ITEM_SKU_UOM_SAVE');
// export const ITEM_SKU_UOM_UPDATE = createRequestTypes('ITEM_SKU_UOM_UPDATE');
// export const ITEM_SKU_UOM_DELETE = createRequestTypes('ITEM_SKU_UOM_DELETE');

// ------------------------Action creators---------------
export const itemInfoGetRequest = createParallelRequestFunc(ITEM_INFO_GET, ['sku/{id}', 'uoms']);
export const itemInfoSaveRequest = createRequestFunc(ITEM_INFO_SAVE, 'sku');
export const itemInfoUpdateRequest = createRequestFunc(ITEM_INFO_UPDATE, 'sku');

// export const itemSkuBinsGetRequest = createRequestFunc(ITEM_SKU_BINS_GET, 'sku/{id}/bins');
// export const itemSkuBinsSaveRequest = createRequestFunc(ITEM_SKU_BINS_SAVE, 'sku/{id}/bins');
// export const itemSkuBinsUpdateRequest = createRequestFunc(ITEM_SKU_BINS_UPDATE, 'sku/{id}/bins');
// export const itemSkuBinsDeleteRequest = createRequestFunc(ITEM_SKU_BINS_DELETE, 'sku/{id}/bins/{linkId}');
// export const itemAllBinsGetRequest = createRequestFunc(ITEM_BINS_GET, 'locations/-1/zones/-1/bins?zoneType={zoneType}');
// export const itemSkuUOMGetRequest = createRequestFunc(ITEM_SKU_UOM_GET, 'sku/{id}/uoms');
// export const itemSkuUOMSaveRequest = createRequestFunc(ITEM_SKU_UOM_SAVE, 'sku/{id}/uoms');
// export const itemSkuUOMUpdateRequest = createRequestFunc(ITEM_SKU_UOM_UPDATE, 'sku/{id}/uoms');
// export const itemSkuUOMDeleteRequest = createRequestFunc(ITEM_SKU_UOM_DELETE, 'sku/{id}/uom/{mapping_id}');

// -------------------Add actions to Sagas --------------
addActionsToSagas([
  ITEM_INFO_GET,
  ITEM_INFO_SAVE,
  ITEM_INFO_UPDATE
]);
