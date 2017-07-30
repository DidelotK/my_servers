import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import API_CONSTANTS from '../../constants/apiConstants';
import HTTP_STATUS from '../../constants/httpStatusConstants';
import { apiTypes } from './apiReducer';
import TypeGenerator from '../TypeGenerator';

const redirectToLogin = function* () {
  yield call(browserHistory.push, '/login');
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

export const callService = function* (apiService, type) {
  let triesLeft = API_CONSTANTS.MAX_TRIES;
  const delayBetweenTry = API_CONSTANTS.DELAY_BETWEEN_TRY;

  while (triesLeft > 1) {
    try {
      const res = yield call(apiService);
      yield put({
        type: TypeGenerator.failure(type),
        resource: res
      });
      break;
    } catch (err) {
      triesLeft--;
      yield call(handleError, err);
      if (triesLeft > 1) {
        yield put({
          type: TypeGenerator.retry(type)
        });
        yield call(delay, delayBetweenTry);
      } else {
        yield put({
          type: TypeGenerator.failure(type)
        });
      }
    }
  }
};

export default function* () {
  yield takeLatest(apiTypes.API_CALL_SERVICE_ERROR, redirectToLogin);
};