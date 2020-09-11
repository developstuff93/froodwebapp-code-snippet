import {
  PRICE_LIST_GET,
  PRICE_LIST_SAVE,
  PRICE_LIST_UPDATE,
  PRICE_LIST_SKU_SAVE,
  PRICE_LIST_SKU_UPDATE,
  SKU_DATA_GET,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  priceListSKUs: [],
  priceList: {
    type: 1,
    isTaxIncl: true
  },
  skuData: {},
  loadingPage: false
};

export default function priceLists(state = initialState, action = {}) {
  switch (action.type) {
    case PRICE_LIST_GET.REQUEST:
    case PRICE_LIST_SAVE.REQUEST:
    case PRICE_LIST_UPDATE.REQUEST:
    case PRICE_LIST_SKU_SAVE.REQUEST:
    case PRICE_LIST_SKU_UPDATE.REQUEST:
    case SKU_DATA_GET.REQUEST:
      return {
        ...state,
        loadingPage: true
      };
    case PRICE_LIST_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        priceList: action.data,
        priceListSKUs: action.data.list
      };
    case PRICE_LIST_SAVE.SUCCESS:
    case PRICE_LIST_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        priceList: action.data
      };
    case PRICE_LIST_SKU_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        priceListSKUs: [action.data, ...state.priceListSKUs],
      };
    case PRICE_LIST_SKU_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        priceListSKUs: state.priceListSKUs.map(item => (item.id === action.data.id ? action.data : item)),
      };
    case SKU_DATA_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        skuData: action.data
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    case '@@router/LOCATION_CHANGE': {
      if (action.payload.pathname.includes('price-lists/')) {
        return state;
      }
      return initialState;
    }
    default:
      return state;
  }
}
