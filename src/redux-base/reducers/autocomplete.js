// @flow
import {
  SKU_SEARCH
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  loadingAutoComplete: false,
  skus: [],
  keyword: '',
};

export default function autocomplete(
  state: Object = initialState,
  action: Object = {}
) {
  switch (action.type) {
    case SKU_SEARCH.REQUEST:
      return {
        ...state,
        loadingAutoComplete: true,
        skus: []
      };
    case SKU_SEARCH.SUCCESS:
      return {
        ...state,
        loadingAutoComplete: false,
        skus: action.data.autocomplete,
        keyword: action.data.keyword,
      };
    default:
      return {
        ...state
      };
  }
}
