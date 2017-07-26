import * as APP_CONSTANTS from '../constants/appConstants';

const initialState = {
  isInitialized: false,
  pathname: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case APP_CONSTANTS.APP_INIT:
      return {
        ...state,
        isInitialized: false
      };
    case APP_CONSTANTS.APP_INIT_SUCCESS:
      return {
        ...state,
        isInitialized: true,
        pathname: action.pathname
      };
    default:
      return {...state};
  }
};

export default user;
