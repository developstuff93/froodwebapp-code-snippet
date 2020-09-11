import { NUMERIC_SAVE } from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  loading: false,
  errorMessage: null
};

export default function numeric(state = initialState, action = {}) {
  switch (action.type) {
    case NUMERIC_SAVE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NUMERIC_SAVE.SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: 'Saved',
        errorMessage: null,
      };
    case NUMERIC_SAVE.FAILURE:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}
