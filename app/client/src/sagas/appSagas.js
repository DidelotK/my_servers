import { call, put, race, take, takeLatest } from 'redux-saga/effects';
import * as APP_CONSTANTS from '../constants/appConstants';
import { API_CALL_SERVICE_ERROR } from '../constants/apiConstants';
import Api from './api/index';

const appInit = function* (action) {
  const {success} = yield race({
    success: call(Api.callService, Api.getServices().GET_RESOURCE),
    failure: take(API_CALL_SERVICE_ERROR)
  });

  if (success) {
    yield put({
      type: APP_CONSTANTS.APP_INIT_SUCCESS,
      pathname: action.pathname
    });
  }
};

export default function* () {
  yield takeLatest(APP_CONSTANTS.APP_INIT, appInit);
};
