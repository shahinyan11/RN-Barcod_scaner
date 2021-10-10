import {takeLatest, put, call} from 'redux-saga/effects';
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_SUCCESS,
  GET_PRODUCTS_REQUEST_FAIL,
} from '../actions/products';

import * as api from '../../apis';
import {hideScreenLoading, showScreenLoading} from '../actions/main';

function* getProducts() {
  try {
    yield showScreenLoading('Get Products');
    const data = yield call(api.getProducts);
    yield put({
      type: GET_PRODUCTS_REQUEST_SUCCESS,
      payload: data,
    });
    yield hideScreenLoading();
  } catch (e) {
    console.log('function* getProducts', e);
  }
}

export default function* watcher() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProducts);
}
