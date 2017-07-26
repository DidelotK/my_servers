import { connect } from 'react-redux';

import { appInit, locationChange } from '../../actions/appActions';
import AppLayout from './appLayout';

const dispatchToProps = dispatch => ({
  appInit: pathname => dispatch(appInit(pathname)),
  locationChange: pathname => dispatch(locationChange(
    pathname
  ))
});

export default connect(undefined, dispatchToProps)(AppLayout);
