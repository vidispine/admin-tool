import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions';

import { withRouterProps } from './withRouterProps';

function mapStateToProps(state, ownProps) {
  const { dialogName, isOpen } = ownProps;
  const {
    ui: { modalName: currentDialog, ...props },
  } = state;
  let open = dialogName !== undefined && currentDialog === dialogName;
  if (isOpen !== undefined) {
    open = isOpen;
  } // To be deprecated
  return open
    ? {
        // only map state props to open dialog
        open,
        currentDialog,
        modalName: currentDialog,
        ...props,
      }
    : {
        open,
        currentDialog,
        modalName: currentDialog,
      };
}

const mapDispatchToProps = {
  onClose: actions.ui.closeModal,
  onOpen: actions.ui.openModal,
};

export const withModalNoRouter = (WrappedComponent) =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);

export default compose(withModalNoRouter, withRouterProps);
