/* eslint-disable new-cap, babel/new-cap, no-constant-condition, no-loop-func */
import { take, put, call } from 'redux-saga/effects';
import { failure } from 'redux-base/actions';
import apiRequest from 'redux-base/common/apiRequest';
import { addParamsToURL, getMainContainerActionsBySagaType } from 'utils';
import { loadPutActions } from 'redux-base/sagas/actionsHelper';

const putActions = loadPutActions().concat(getMainContainerActionsBySagaType('put'));

export default function* putSaga() {
  while (true) {
    try {
      const filter = yield take(putActions);

      const endpoint = addParamsToURL(filter, filter.endpoint);

      const { response, error } =
        yield call(apiRequest, apiClient => apiClient.put(endpoint, filter.payload));

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
