/* eslint-disable */
import {
  ORDER_GET_PICK_DATA,
  ORDER_GET_ALLOCATION_DATA,
  ORDER_GET_PACK_DATA,
  ORDER_GET_SHIP_DATA,
  ORDER_GET_INVOICE_DATA,

  ORDER_UPDATE_PICK_DATA,
  ORDER_UPDATE_ALLOCATION_DATA,
  ORDER_UPDATE_PACK_DATA,
  ORDER_UPDATE_SHIP_DATA,

} from 'redux-base/actions';

export default function orderTabs(state, action) {
  switch (action.type) {
    // request
    case ORDER_GET_PICK_DATA.REQUEST:
    case ORDER_GET_ALLOCATION_DATA.REQUEST:
    case ORDER_GET_PACK_DATA.REQUEST:
    case ORDER_GET_SHIP_DATA.REQUEST:
    case ORDER_GET_INVOICE_DATA.REQUEST:
    case ORDER_UPDATE_PICK_DATA.REQUEST:
    case ORDER_UPDATE_ALLOCATION_DATA.REQUEST:
    case ORDER_UPDATE_PACK_DATA.REQUEST:
    case ORDER_UPDATE_SHIP_DATA.REQUEST:
      return {
        ...state,
        loadingPage: true
      };

    // success
    case ORDER_GET_PICK_DATA.SUCCESS:
    case ORDER_UPDATE_PICK_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        pickData: action.data
      };
    case ORDER_GET_ALLOCATION_DATA.SUCCESS:
    case ORDER_UPDATE_ALLOCATION_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        allocationData: action.data
      };
    case ORDER_GET_PACK_DATA.SUCCESS:
    case ORDER_UPDATE_PACK_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        packData: action.data
      };
    case ORDER_GET_SHIP_DATA.SUCCESS:
    case ORDER_UPDATE_SHIP_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        shipData: action.data
      };
    case ORDER_GET_INVOICE_DATA.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        invoiceData: action.data
      };
  }
}
