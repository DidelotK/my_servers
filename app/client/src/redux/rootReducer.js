import { combineReducers } from 'redux';

import appReducer from './appRedux/appReducer';

const rootReducer = combineReducers({
  appReducer
});

export default rootReducer;
