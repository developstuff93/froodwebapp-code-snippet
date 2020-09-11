import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import addActionsToSagas from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const CHANNELS_GET = createRequestTypes('CHANNELS_GET');
export const DEFAULT_CHANNEL_GET_PARALLEL = createRequestTypes('DEFAULT_CHANNEL_GET_PARALLEL');
export const DEFAULT_CHANNEL_UPDATE = createRequestTypes('DEFAULT_CHANNEL_UPDATE');

// ------------------------Action creators---------------
export const channelsGetRequest = createRequestFunc(CHANNELS_GET, 'channels');
export const defaultChannelGetRequest = createParallelRequestFunc(DEFAULT_CHANNEL_GET_PARALLEL, ['channels/{id}', 'pricelists']);
export const defaultChannelUpdateRequest = createRequestFunc(DEFAULT_CHANNEL_UPDATE, 'channel');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  CHANNELS_GET,
  DEFAULT_CHANNEL_GET_PARALLEL,
  DEFAULT_CHANNEL_UPDATE
]);
