import {
  // MainContainers
  ORDERS,
  PROMOTIONS,
  CUSTOMERS,
  ITEMS,
  PURCHASE_ORDERS,
  SUPPLIERS,
  ADJUSTMENTS
} from 'redux-base/actions';

const actions = [
  ORDERS,
  PROMOTIONS,
  CUSTOMERS,
  ITEMS,
  PURCHASE_ORDERS,
  SUPPLIERS,
  ADJUSTMENTS
];

export default (httpType) => {
  switch (httpType) {
    case 'get':
      return actions.map(action => action.GET.REQUEST);
    case 'post': {
      const filterSaveActions = actions.map(action => action.FILTER_SAVE.REQUEST);
      const getWithFilterActions = actions.map(action => action.GET_WITH_FILTER.REQUEST);
      return filterSaveActions.concat(getWithFilterActions);
    }
    case 'put': {
      const filterUpdateActions = actions.map(action => action.FILTER_UPDATE.REQUEST);
      const columnsUpdateActions = actions.map(action => action.UPDATE_DEFAULT_COLUMNS.REQUEST);
      return filterUpdateActions.concat(columnsUpdateActions);
    }
    case 'delete':
      return actions.map(action => action.FILTER_DELETE.REQUEST);
    case 'autocomplete':
      return actions.map(action => action.SEARCH.REQUEST);
    default:
      return [];
  }
};
