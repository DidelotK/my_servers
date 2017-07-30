import { connect } from 'react-redux';

import { appActions } from '../../redux/appRedux/appReducer';
import AppLayout from './appLayout';

const dispatchToProps = dispatch => ({
  appInit: pathname => dispatch(appActions.appInit(pathname)),
  locationChange: pathname => dispatch(appActions.locationChange(
    pathname
  ))
});

export default connect(undefined, dispatchToProps)(AppLayout);
