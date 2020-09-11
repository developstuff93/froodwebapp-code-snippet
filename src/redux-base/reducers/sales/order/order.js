import moment from 'moment';
import {
  ORDER_CUSTOMER_SEARCH,
  ORDER_SALES_PERSON_SEARCH,
  ORDER_CUSTOMER_INFO_GET,
  ORDER_SKU_SEARCH,
  ORDER_SKU_INFO_GET,
  ORDER_INFO_GET,
  // common
  ERROR
} from 'redux-base/actions';
import orderTabs from './orderTabs';


export const initialValues = {
  channel: {
    id: 1,
    name: 'Manual'
  },
  channelRef: 'Unassigned',
  customer: {
    id: null,
    name: ''
  },
  customerCredit: 0,
  customerNotes: null,
  deliveryDate: moment(new Date()).format('DD-MMMM-YYYY'),
  deliveryMethodId: null,
  deliverySlotId: null,
  isRecurring: false,
  orderDate: moment(new Date()).format('DD-MMMM-YYYY'),
  paymentTerms: {
    id: null
  },
  promoCode: null,
  skuDetails: [],
  status: 'Draft',
  termsAndCondition: null
};

// --------------------------- Reducer function --------------------------
const initialState = {
  customersAutocomplete: [],
  salesAutocomplete: [],
  tableAutocomplete: [],
  loadingPage: false,
  loadingTableAutoComplete: false,
  loadingAutoComplete: false,
  billingAddress: null,
  shippingAddress: null,
  customersKeyword: '',
  salesKeyword: '',
  tableAutocompleteKeyword: '',
  initialValues
};

function order(state = initialState, action = {}) {
  const orderTabsState = orderTabs(state, action);
  if (orderTabsState) return orderTabsState;

  switch (action.type) {
    // REQUEST
    case ORDER_CUSTOMER_SEARCH.REQUEST:
    case ORDER_SALES_PERSON_SEARCH.REQUEST:
      return {
        ...state,
        loadingAutoComplete: true
      };
    case ORDER_CUSTOMER_INFO_GET.REQUEST:
      return {
        ...state,
        loadingPage: true,
        loadingAutoComplete: false,
      };
    case ORDER_SKU_SEARCH.REQUEST:
      return {
        ...state,
        loadingTableAutoComplete: true
      };
    case ORDER_SKU_INFO_GET.REQUEST:
    case ORDER_INFO_GET.REQUEST:
      return {
        ...state,
        loadingPage: true
      };


    // SUCCESS
    case ORDER_INFO_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        initialValues: action.data,
        billingAddress: action.data.billingAddress,
        shippingAddress: action.data.shippingAddress
      };
    case ORDER_CUSTOMER_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        customersAutocomplete: action.data.autocomplete,
        customersKeyword: action.data.keyword,
      };
    case ORDER_SALES_PERSON_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        salesAutocomplete: action.data.autocomplete,
        salesKeyword: action.data.keyword,
      };
    case ORDER_CUSTOMER_INFO_GET.SUCCESS: {
      const shippingAddress = action.data.addresses && action.data.addresses.find(address => address.isDefault === true);
      return {
        ...state,
        initialValues: {
          ...state.initialValues,
          addresses: {
            shippingAddressId: shippingAddress && shippingAddress.id
          }
        },
        billingAddress: shippingAddress,
        shippingAddress,
        loadingPage: false,
        loadingAutoComplete: false,
      };
    }
    case ORDER_SKU_SEARCH.SUCCESS:
      return {
        ...state,
        tableAutocomplete: action.data.autocomplete,
        tableAutocompleteKeyword: action.data.keyword,
        loadingTableAutoComplete: false
      };
    case ORDER_SKU_INFO_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        skuInfo: action.data[0]
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
        loadingAutoComplete: false,
        loadingTableAutoComplete: false
      };
    default:
      if (!action.type.includes('@@redux-form')) {
        return {
          ...initialState
        };
      }
      return state;
  }
}

export default order;

