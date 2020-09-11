import {
  UOM_GET,
  UOM_SAVE,
  UOM_UPDATE,
  UOM_DELETE,
  UOM_CONVERSION_GET,
  UOM_CONVERSION_SAVE,
  UOM_CONVERSION_UPDATE,
  UOM_CONVERSION_DELETE,
  ITEM_INFO_GET
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  conversions: [],
  loadingPage: false,
  needReloadUOM: false,
  needReloadUOMConversions: false,
};

export default function uom(state = initialState, action = {}) {
  switch (action.type) {
    case UOM_GET.REQUEST:
    case UOM_SAVE.REQUEST:
    case UOM_UPDATE.REQUEST:
    case UOM_DELETE.REQUEST:
    case UOM_CONVERSION_GET.REQUEST:
    case UOM_CONVERSION_SAVE.REQUEST:
    case UOM_CONVERSION_UPDATE.REQUEST:
    case UOM_CONVERSION_DELETE.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case UOM_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data,
        needReloadUOM: false
      };
    case ITEM_INFO_GET.SUCCESS:
      return {
        ...state,
        data: action.data[1]
      };
    case UOM_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: [action.data, ...state.data]
      };
    case UOM_UPDATE.SUCCESS:
    case UOM_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadUOM: true,
      };
    case UOM_CONVERSION_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        conversions: action.data,
        needReloadUOMConversions: false,
      };
    case UOM_CONVERSION_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        conversions: [action.data, ...state.conversions]
      };
    case UOM_CONVERSION_UPDATE.SUCCESS:
    case UOM_CONVERSION_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadUOMConversions: true,
      };
    default:
      return state;
  }
}
