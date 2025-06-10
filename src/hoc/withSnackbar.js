import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions';

import { withRouterProps } from './withRouterProps';

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
};

export const withSnackbarNoRouter = (WrappedComponent) =>
  connect(null, mapDispatchToProps)(WrappedComponent);

export default compose(withSnackbarNoRouter, withRouterProps);
