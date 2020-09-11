import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';

// ------------------------Action constants---------------
export const PROMOTIONS = getMainContainerActions('PROMOTIONS');

// ------------------------Action creators---------------
export const PROMOTIONS_REQUESTS = getMainContainerActionsCreators(PROMOTIONS, 'promotions');

