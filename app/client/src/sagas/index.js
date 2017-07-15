import appSagas from './appSagas';

export default function*() {
  yield [
    appSagas()
  ];
};
