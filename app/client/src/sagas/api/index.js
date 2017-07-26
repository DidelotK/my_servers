import { call, put } from 'redux-saga/effects';
import { getResource } from './someApiService';
import { API_CALL_SERVICE_ERROR } from '../../constants/apiConstants';

export default class Api {
  static getServices() {
    return {
      GET_RESOURCE: getResource
    };
  }
  static *callService(apiService) {
    try {
      return yield call(apiService);
    } catch (err) {
      yield put({
        type: API_CALL_SERVICE_ERROR
      });
    }
  }
}
