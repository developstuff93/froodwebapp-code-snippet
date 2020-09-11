import moment from 'moment';
import {
  PURCHASE_ORDER_GET_PARALLEL,
  PURCHASE_ORDER_FIELDS_GET_PARALLEL,
  PURCHASE_ORDER_SUPPLIER_SEARCH,
  PURCHASE_SUPPLIER_LOCATIONS_GET,
  PURCHASE_ORDER_SKU_SEARCH,
  PURCHASE_ORDER_SKU_INFO_GET,
  // common
  ERROR
} from 'redux-base/actions';
import orderTabs from './orderTabs';


export const initialValues = {
  date: moment(new Date()).format('DD-MMMM-YYYY'),
  deliveryDate: moment(new Date()).format('DD-MMMM-YYYY'),
  contactUserId: null,
  shippingMethodId: null,
  paymentTerms: {
    id: null,
  },
  status: 'Draft',
  details: [],
  vendor: {
    id: null,
    name: '',
  },
  shipping: 0,
  adjustment: 0
};

// --------------------------- Reducer function --------------------------
const initialState = {
  suppliersAutocomplete: [],
  tableAutocomplete: [],
  loadingPage: false,
  loadingTableAutoComplete: false,
  loadingAutoComplete: false,
  supplierAddress: null,
  billingAddress: null,
  shippingAddress: null,
  supplierLocations: [],
  companyLocations: [],
  contactUsers: [],
  suppliersKeyword: '',
  tableAutocompleteKeyword: '',
  initialValues
};

function order(state = initialState, action = {}) {
  const orderTabsState = orderTabs(state, action);
  if (orderTabsState) return orderTabsState;

  switch (action.type) {
    // REQUEST
    case PURCHASE_ORDER_SUPPLIER_SEARCH.REQUEST:
      return {
        ...state,
        loadingAutoComplete: true
      };
    case PURCHASE_ORDER_FIELDS_GET_PARALLEL.REQUEST:
    case PURCHASE_ORDER_GET_PARALLEL.REQUEST:
      return {
        ...state,
        loadingPage: true
      };


    // SUCCESS
    case PURCHASE_ORDER_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        initialValues: action.data[0],
        companyLocations: action.data[1],
        contactUsers: action.data[2],
        supplierAddress: action.data[0].vendor.address,
        billingAddress: action.data[0].billToCompany.address,
        shippingAddress: action.data[0].shipToCompany.address,
      };
    case PURCHASE_ORDER_FIELDS_GET_PARALLEL.SUCCESS: {
      const shippingAddress = action.data[0] && action.data[0].find(address => address.isDefault === true);
      return {
        ...state,
        billingAddress: shippingAddress,
        shippingAddress,
        companyLocations: action.data[0],
        contactUsers: action.data[1],
        loadingPage: false,
        loadingAutoComplete: false,
      };
    }
    case PURCHASE_ORDER_SUPPLIER_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        suppliersAutocomplete: action.data.autocomplete,
        suppliersKeyword: action.data.keyword.toLowerCase(),
      };
    case PURCHASE_SUPPLIER_LOCATIONS_GET.SUCCESS: {
      const supplierAddress = action.data && action.data.find(address => address.typeDescription !== 'Warehouse');
      return {
        ...state,
        supplierAddress,
        supplierLocations: action.data,
        loadingPage: false,
        loadingAutoComplete: false,
      };
    }
    case PURCHASE_ORDER_SKU_SEARCH.SUCCESS:
      return {
        ...state,
        tableAutocomplete: action.data.autocomplete,
        tableAutocompleteKeyword: action.data.keyword,
        loadingTableAutoComplete: false
      };
    case PURCHASE_ORDER_SKU_INFO_GET.SUCCESS:
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
