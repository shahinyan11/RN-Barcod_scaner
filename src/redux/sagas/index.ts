import {all, fork} from 'redux-saga/effects';
import auth from './auth';
import products from './products';

export default function* root() {
  const sagas = [auth, products];
  yield all(sagas.map(fork));
}
