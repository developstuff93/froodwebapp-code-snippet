import {
  CHANNELS_GET,
  DEFAULT_CHANNEL_GET_PARALLEL,
  DEFAULT_CHANNEL_UPDATE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  data: [],
  channelData: [],
  priceList: [],
  payterms: [],
  loadingPage: false
};

export default function channels(state = initialState, action = {}) {
  switch (action.type) {
    case CHANNELS_GET.REQUEST:
    case DEFAULT_CHANNEL_GET_PARALLEL.REQUEST:
    case DEFAULT_CHANNEL_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case CHANNELS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        data: action.data
      };
    case DEFAULT_CHANNEL_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        channelData: action.data[0],
        priceList: action.data[1],
        payterms: action.data[2]
      };
    case DEFAULT_CHANNEL_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    default:
      return state;
  }
}
