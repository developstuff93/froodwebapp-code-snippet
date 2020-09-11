/* eslint-disable new-cap, babel/new-cap, no-constant-condition */
import { put, call, throttle } from 'redux-saga/effects';
import { failure } from 'redux-base/actions';
import apiRequest from 'redux-base/common/apiRequest';
import { addParamsToURL, getMainContainerActionsBySagaType } from 'utils';
import { loadAutocompleteActions } from 'redux-base/sagas/actionsHelper';

const autocompleteActions = loadAutocompleteActions().concat(getMainContainerActionsBySagaType('autocomplete'));

function* autoCompleteSaga(filter) {
  const url = addParamsToURL(filter, filter.endpoint);
  const { response, error } = yield call(apiRequest, apiClient => apiClient.get(url));

  if (response) {
    const { data } = response;
    yield put(filter.successCb({ autocomplete: data, keyword: filter.payload }));
  } else {
    yield put(failure(error));
  }
}

export default function* throttleAutoCompleteSaga() {
  yield throttle(
    1000,
    autocompleteActions,
    autoCompleteSaga
  );
}
