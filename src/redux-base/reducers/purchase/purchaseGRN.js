import {
  PURCHASE_GET,
  PURCHASE_SAVE
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  loading: false,
};

export default function purchaseGRN(state = initialState, action = {}) {
  switch (action.type) {
    case PURCHASE_GET.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PURCHASE_GET.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case PURCHASE_SAVE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PURCHASE_SAVE.SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: 'Saved',
      };
    default:
      return state;
  }
}
