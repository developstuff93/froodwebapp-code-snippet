// --------------------------- Reducer function --------------------------
import {
  ERROR,
  REMOVE_WARNING_NOTIFICATION,
  ADD_WARNING_NOTIFICATIONS
} from 'redux-base/actions';
// import { getRandomId } from 'utils';
import { remove, uniqBy } from 'lodash';

const initialState = {
  errorDescription: null,
  warningNotifications: []
};

// const convertOrderWarningMessages = messages => (
//   messages.map(msg => ({
//     msg: `Order ${msg.orderNo} cannot be cancelled`,
//     id: getRandomId()
//   }))
// );

export default function error(state = initialState, action = {}) {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        errorDescription: action.data,
      };
    case ADD_WARNING_NOTIFICATIONS:
      return {
        ...state,
        warningNotifications: uniqBy(state.warningNotifications.concat(action.notifications), 'msg'),
      };
    // case ORDERS.CANCEL_ORDERS.SUCCESS:
    //   return {
    //     ...state,
    //     warningNotifications: uniqBy(state.warningNotifications.concat(convertOrderWarningMessages(action.notifications)), 'msg'),
    //   };
    case REMOVE_WARNING_NOTIFICATION:
      return {
        ...state,
        warningNotifications: remove(state.warningNotifications, wrn => wrn.id !== action.id),
      };
    default:
      return {
        ...state,
        errorDescription: null,
      };
  }
}

