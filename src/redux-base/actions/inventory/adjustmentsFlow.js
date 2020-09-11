import {
  getMainContainerActions,
  getMainContainerActionsCreators
} from 'utils';

// ------------------------Action constants---------------
export const ADJUSTMENTS = getMainContainerActions('ADJUSTMENTS');

// ------------------------Action creators---------------
export const ADJUSTMENTS_REQUESTS = getMainContainerActionsCreators(ADJUSTMENTS, 'adjustments');
