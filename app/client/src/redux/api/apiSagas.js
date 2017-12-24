import {call, put, takeLatest} from 'redux-saga/effects';
import {browserHistory} from 'react-router';

import APP_CONSTANTS from '../../constants/appConstants';
import HTTP_STATUS from '../../constants/httpStatusConstants';
import {apiTypes} from './apiReducer';
import TypeGenerator from '../TypeGenerator';

const redirectToLogin = function* () {
  yield call(browserHistory.push, APP_CONSTANTS.LOGIN_PAGE);
};

const handleError = function* (err) {
  const errorStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR;

  if (errorStatus === HTTP_STATUS.FORBIDDEN) {
    yield put({
      type: apiTypes.API_CALL_SERVICE_ERROR,
      err
    });
  }
};

/**
 * This function call a service from the api,
 * and dispatch a global error if necessary
 * @param apiService
 * @param type
 */
export const callService = function* (apiService, type) {
  try {
    const res = yield call(apiService);
    yield put({
      type: TypeGenerator.failure(type),
      resource: res
    });
  } catch (err) {

    yield call(handleError, err);

    yield put({
      type: TypeGenerator.failure(type)
    });

  }
};

export default function* () {
  yield takeLatest(apiTypes.API_CALL_SERVICE_ERROR, redirectToLogin);
};