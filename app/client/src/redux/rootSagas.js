import { spawn } from 'redux-saga/effects';
import appSagas from './appRedux/appSagas';
import apiSagas from './api/apiSagas';

export default function* () {
  yield [
    spawn(appSagas),
    spawn(apiSagas)
  ];
};
