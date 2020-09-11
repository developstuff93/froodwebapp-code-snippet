// @flow
import {
  GET_COMMON_DATA,
  STATE_CITIES_GET,
  LOGOUT
} from 'redux-base/actions';

type CommonDataArray = Array<{ id: number, name: string }>;

// --------------------------- Reducer function --------------------------
const initialState: {
  countries: CommonDataArray,
  countryStates: CommonDataArray,
  userCountryStates: CommonDataArray,
  cities: CommonDataArray,
  currencies: CommonDataArray,
  payterms: CommonDataArray,
  locationTypes: CommonDataArray,
  zoneTypes: CommonDataArray,
  adjustmentReasons: CommonDataArray,
  categories: CommonDataArray,
  taxCategories: CommonDataArray,
  defaultLocations: CommonDataArray,
  deliveryMethods: CommonDataArray,
  shippingMethods: CommonDataArray,
  promotionFields: CommonDataArray
} = {
  commonDataLoading: false,
  commonDataLoaded: false,
  countries: [],
  countryStates: [],
  userCountryStates: [],
  cities: [],
  currencies: [],
  payterms: [],
  locationTypes: [],
  zoneTypes: [],
  deliveryMethods: [],
  shippingMethods: [],
  promotionFields: [],
  adjustmentReasons: [],
  categories: [],
  taxCategories: [],
  defaultLocations: []
};

export default function commonData(
  state: Object = initialState,
  action: Object = {}
) {
  switch (action.type) {
    case GET_COMMON_DATA.REQUEST:
      return {
        ...state,
        commonDataLoading: true,
      };
    case GET_COMMON_DATA.SUCCESS:
      return {
        ...state,
        commonDataLoading: false,
        commonDataLoaded: true,
        countries: action.data.countries,
        countryStates: action.data.countryStates,
        userCountryStates: action.data.states,
        payterms: action.data.paymentTerms,
        currencies: action.data.currencies,
        locationTypes: action.data.locationTypes,
        zoneTypes: action.data.zoneTypes,
        adjustmentReasons: action.data.adjustmentReasons,
        categories: action.data.categories,
        taxCategories: action.data.taxCategories,
        defaultLocations: action.data.defaultLocations,
        deliveryMethods: action.data.transporters,
        shippingMethods: action.data.shippingMethods,
        promotionFields: action.data.promotionFields
      };
    case STATE_CITIES_GET.SUCCESS:
      return {
        ...state,
        cities: action.data,
      };
    case LOGOUT:
      return initialState;
    default:
      return {
        ...state
      };
  }
}
