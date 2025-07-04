import { PureComponent } from 'react';

import { connect } from 'react-redux';

import * as actions from '../actions';

const mapDispatchToProps = {
  onClose: actions.ui.closeModal,
  onOpen: actions.ui.openModal,
};

const withDialogProps = (WrappedComponent) =>
  connect(
    null,
    mapDispatchToProps,
  )(
    class extends PureComponent {
      constructor(props) {
        super(props);
        this.onOpen = this.onOpen.bind(this);
        this.state = {
          dialogProps: undefined,
        };
      }

      onOpen(modalName) {
        const { onOpen } = this.props;
        return (dialogProps) => {
          this.setState({ dialogProps }, () => onOpen({ modalName }));
        };
      }

      render() {
        const { dialogProps } = this.state;
        return <WrappedComponent {...this.props} dialogProps={dialogProps} onOpen={this.onOpen} />;
      }
    },
  );

export default withDialogProps;
