// @flow
import { createRequestTypes, createRequestFunc } from 'utils';
import addActionsToSagas from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const GET_COMMON_DATA = createRequestTypes('GET_COMMON_DATA');
export const STATE_CITIES_GET = createRequestTypes('STATE_CITIES_GET');

// ------------------------Action creators---------------
export const citySearchRequest = createRequestFunc(STATE_CITIES_GET, 'states/{id}/cities');

export const commonDataRequest = () => ({
  type: GET_COMMON_DATA.REQUEST
});

export const commonDataSuccess = (data: Object) => ({
  type: GET_COMMON_DATA.SUCCESS,
  data
});

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  STATE_CITIES_GET
]);
