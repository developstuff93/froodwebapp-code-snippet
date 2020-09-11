import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';

// ------------------------Action constants---------------
export const CUSTOMERS = getMainContainerActions('CUSTOMERS');

// ------------------------Action creators---------------
export const CUSTOMERS_REQUESTS = getMainContainerActionsCreators(CUSTOMERS, 'customers');
