import TypeGenerator from '../TypeGenerator';

export const appTypes = {
  APP_LOCATION_CHANGE: 'APP::LOCATION_CHANGE',
  APP_INIT: 'APP::INIT'
};

export const appActions = {
  appInit: pathname => ({type: appTypes.APP_INIT, pathname}),
  locationChange: pathname => ({type: appTypes.APP_LOCATION_CHANGE, pathname})
};

const initialState = {
  isInitialized: false,
  pathname: null
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case appTypes.APP_INIT:
      return {
        ...state,
        isInitialized: false
      };
    case TypeGenerator.success(appTypes.APP_INIT):
      return {
        ...state,
        isInitialized: true,
        pathname: action.pathname
      };
    default:
      return {...state};
  }
};

export default appState;
