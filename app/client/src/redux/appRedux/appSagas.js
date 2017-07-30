import { call, fork, put, race, take, takeLatest } from 'redux-saga/effects';
import { apiTypes } from '../api/apiReducer';
import { callService } from '../api/apiSagas';
import { appTypes } from './appReducer';
import { getResource } from '../api/services/someApiService';
import TypeGenerator from '../TypeGenerator';

const getResource1 = function* () {
  yield call(callService, getResource, apiTypes.API_GET_1);
};

const getResource2 = function* () {
  yield call(callService, getResource, apiTypes.API_GET_2);
};

const patternMandatoryFailure = action => {
  switch (action.type) {
    case apiTypes.API_CALL_SERVICE_ERROR:
    case TypeGenerator.failure(apiTypes.API_GET_1):
      return true;
    default:
      return false;
  }
};

const getAppMandatoryData = function* () {
  yield fork(getResource1);
};

const getAppOptionalData = function* () {
  yield fork(getResource2);
};

const appInit = function* (action) {
  const {success, failure} = yield race({
    success: [
      call(getAppMandatoryData),
      call(getAppOptionalData)
    ],
    failure: take(patternMandatoryFailure)
  });

  if (success) {
    yield put({
      type: TypeGenerator.success(appTypes.APP_INIT),
      pathname: action.pathname
    });
  }

  if (failure) {
    yield put({
      type: TypeGenerator.failure(appTypes.APP_INIT)
    });
  }
};

export default function* () {
  yield takeLatest(appTypes.APP_INIT, appInit);
};
