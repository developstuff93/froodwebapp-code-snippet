import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';

// ------------------------Action constants---------------
export const ITEMS = getMainContainerActions('ITEMS');

// ------------------------Action creators---------------
export const ITEMS_REQUESTS = getMainContainerActionsCreators(ITEMS, 'inventory');
