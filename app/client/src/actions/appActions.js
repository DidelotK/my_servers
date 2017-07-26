import * as types from '../constants/appConstants';

export const appInit = pathname => ({
  type: types.APP_INIT,
  pathname
});

export const locationChange = pathname => ({
  type: types.LOCATION_CHANGE,
  pathname
});
