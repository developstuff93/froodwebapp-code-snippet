import {
  PROMOTION_GET,
  PROMOTION_SAVE,
  PROMOTION_UPDATE,
  ERROR
} from 'redux-base/actions';

const initialState = {
  initialValues: null,
  loadingPage: false,
  successSave: false
};

export default function promotion(state = initialState, action = {}) {
  switch (action.type) {
    // REQUEST
    case PROMOTION_GET.REQUEST:
    case PROMOTION_SAVE.REQUEST:
    case PROMOTION_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        successSave: false
      };

    // SUCCESS
    case PROMOTION_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        initialValues: action.data
      };
    case PROMOTION_SAVE.SUCCESS:
    case PROMOTION_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        successSave: true
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false
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
