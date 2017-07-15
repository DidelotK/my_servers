import { put, takeLatest } from 'redux-saga/effects';
import * as APP_CONSTANTS from '../constants/appConstant';

const appInit = function*() {
  yield put({type: APP_CONSTANTS.APP_INIT_SUCCESS});
};

export default function* () {
  yield takeLatest(APP_CONSTANTS.APP_INIT, appInit);
};
