import {
  CUSTOMER_PROFILE_GET,
  CUSTOMER_PROFILE_UPDATE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  customerData: {},
  loadingPage: false,
};

export default function customerProfile(state = initialState, action = {}) {
  switch (action.type) {
    case CUSTOMER_PROFILE_GET.REQUEST:
    case CUSTOMER_PROFILE_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case CUSTOMER_PROFILE_GET.SUCCESS:
    case CUSTOMER_PROFILE_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        customerData: action.data,
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false
      };
    default:
      return state;
  }
}
