import {connect} from 'react-redux';

import {locationChange} from '../../actions/appActions';
import AppLayout from './appLayout';

const dispatchToProps = dispatch => ({
  locationChange: pathname => dispatch(locationChange(
    pathname
  ))
});

export default connect(undefined, dispatchToProps)(AppLayout);
