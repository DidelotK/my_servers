import * as types from '../constants/appConstant';

export const locationChange = pathname => ({
  type: types.LOCATION_CHANGE,
  pathname
});
