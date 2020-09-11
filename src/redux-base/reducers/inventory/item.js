import {
  ITEM_INFO_GET,
  ITEM_INFO_SAVE,
  ITEM_INFO_UPDATE,
  // ITEM_SKU_AND_BINS_GET,
  // ITEM_SKU_BINS_GET,
  // ITEM_SKU_BINS_SAVE,
  // ITEM_SKU_BINS_UPDATE,
  // ITEM_SKU_BINS_DELETE,
  // ITEM_BINS_GET,
  // ITEM_SKU_UOM_GET,
  // ITEM_SKU_UOM_SAVE,
  // ITEM_SKU_UOM_UPDATE,
  // ITEM_SKU_UOM_DELETE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  itemInfo: null,
  loadingPage: false,
  needReloadSkuBins: false,
  needReloadSkuUOM: false,
};

export default function item(state = initialState, action = {}) {
  switch (action.type) {
    case ITEM_INFO_GET.REQUEST:
    case ITEM_INFO_SAVE.REQUEST:
    case ITEM_INFO_UPDATE.REQUEST:
    // case ITEM_SKU_AND_BINS_GET.REQUEST:
    // case ITEM_SKU_BINS_GET.REQUEST:
    // case ITEM_SKU_BINS_SAVE.REQUEST:
    // case ITEM_SKU_BINS_UPDATE.REQUEST:
    // case ITEM_SKU_BINS_DELETE.REQUEST:
    // case ITEM_BINS_GET.REQUEST:
    // case ITEM_SKU_UOM_GET.REQUEST:
    // case ITEM_SKU_UOM_SAVE.REQUEST:
    // case ITEM_SKU_UOM_UPDATE.REQUEST:
    // case ITEM_SKU_UOM_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadSkuBins: false,
        needReloadSkuUOM: false
      };
    case ITEM_INFO_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        itemInfo: action.data[0]
      };
    case ITEM_INFO_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
      };
    case ITEM_INFO_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    default:
      return state;
  }
}
