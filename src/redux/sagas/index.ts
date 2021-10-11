import {all, fork} from 'redux-saga/effects';
import auth from './auth';
import products from './products';
import locations from './locations';

export default function* root() {
  const sagas = [auth, products, locations];
  yield all(sagas.map(fork));
}
