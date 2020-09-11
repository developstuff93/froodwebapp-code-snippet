import { getMainContainerActions, getMainContainerActionsCreators } from 'utils';

// ------------------------Action constants---------------
export const SUPPLIERS = getMainContainerActions('SUPPLIERS');

// ------------------------Action creators---------------
export const SUPPLIERS_REQUESTS = getMainContainerActionsCreators(SUPPLIERS, 'vendors');
