import {
  CUSTOMER_ORDERS_GET,
  CUSTOMER_ORDERS_SEARCH,
  CUSTOMER_NEW_SAVE,
  STATE_CITIES_GET,
  CLEAR_SUCCESS,
  CUSTOMER_ADDRESSES_GET,
  CUSTOMER_ADDRESSES_SAVE,
  CUSTOMER_ADDRESSES_UPDATE,
  CUSTOMER_ADDRESSES_DELETE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  addresses: [],
  orders: {},
  orderAutocomplete: [],
  loadingPage: false,
  needReloadAddresses: false,
  loadingAutoComplete: false,
  successSave: false,
  newCustomer: null
};

export default function customer(state = initialState, action = {}) {
  switch (action.type) {
    case CUSTOMER_ADDRESSES_GET.REQUEST:
    case CUSTOMER_ORDERS_GET.REQUEST:
    case CUSTOMER_NEW_SAVE.REQUEST:
    case CUSTOMER_ADDRESSES_SAVE.REQUEST:
    case CUSTOMER_ADDRESSES_UPDATE.REQUEST:
    case CUSTOMER_ADDRESSES_DELETE.REQUEST:
    case STATE_CITIES_GET.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadAddresses: false,
        loadingAutoComplete: false,
        successSave: false
      };
    case CUSTOMER_ADDRESSES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        addresses: action.data
      };
    case CUSTOMER_ORDERS_SEARCH.REQUEST:
      return {
        ...state,
        loadingPage: false,
        loadingAutoComplete: true
      };
    case CUSTOMER_ORDERS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        orders: action.data
      };
    case CUSTOMER_ORDERS_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        orderAutocomplete: action.data.autocomplete.data
      };
    case CUSTOMER_NEW_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        newCustomer: action.data,
        successSave: true
      };
    case CUSTOMER_ADDRESSES_SAVE.SUCCESS:
    case CUSTOMER_ADDRESSES_UPDATE.SUCCESS:
    case CUSTOMER_ADDRESSES_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadAddresses: true
      };
    case STATE_CITIES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        successSave: false,
        newCustomer: null
      };
    case ERROR:
      return {
        ...state,
        successSave: false,
        loadingPage: false,
        loadingAutoComplete: false
      };
    default:
      return state;
  }
}
