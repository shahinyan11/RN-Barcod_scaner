import {takeLatest, put, call} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS} from '../actions/auth';

import * as api from '../../apis';
import {hideScreenLoading, showScreenLoading} from '../actions/main';

function* login(action: any) {
  try {
    yield showScreenLoading('Logging in');
    const data = yield call(api.login, action.payload.data);
    yield put({
      type: LOGIN_REQUEST_SUCCESS,
      payload: data,
    });
    yield hideScreenLoading();
  } catch (e) {
    console.log('function* auth', e);
  }
}

export default function* watcher() {
  yield takeLatest(LOGIN_REQUEST, login);
}
