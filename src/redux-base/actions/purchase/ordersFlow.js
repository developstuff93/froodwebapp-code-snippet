import { getMainContainerActions, getMainContainerActionsCreators } from 'utils';

// ------------------------Action constants---------------
export const PURCHASE_ORDERS = getMainContainerActions('PURCHASE_ORDERS');

// ------------------------Action creators---------------
export const PURCHASE_ORDERS_REQUESTS = getMainContainerActionsCreators(PURCHASE_ORDERS, 'purchases');
