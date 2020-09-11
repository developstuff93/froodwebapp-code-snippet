/* eslint-disable new-cap, babel/new-cap, no-constant-condition */
import { take, put, call } from 'redux-saga/effects';
import { failure } from 'redux-base/actions';
import apiRequest from 'redux-base/common/apiRequest';
import { addParamsToURL, getMainContainerActionsBySagaType } from 'utils';
import { loadGetActions } from 'redux-base/sagas/actionsHelper';

const getActions = loadGetActions().concat(getMainContainerActionsBySagaType('get'));

export default function* getSaga() {
  while (true) {
    try {
      const filter = yield take(getActions);

      const getURL = addParamsToURL(filter, filter.endpoint);

      const { response, error } =
        yield call(apiRequest, apiClient => apiClient.get(getURL, { responseType: filter.responseType }));

      if (response) {
        const { data } = response;
        yield put(filter.successCb(data));
      } else {
        yield put(failure(error));
      }
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}
