import { PureComponent } from 'react';

import { connect } from 'react-redux';

import { storagegroup as api } from '@vidispine/vdt-api';

import * as actions from '../actions';
import StorageGroupDialog from '../components/storagegroup/StorageGroupDialog';
import StorageGroupListCard from '../components/storagegroup/StorageGroupListCard';
import StorageGroupListTitle from '../components/storagegroup/StorageGroupListTitle';
import CodeModal from '../components/ui/CodeModal';

const STORAGEGROUP_LIST_CODE_MODAL = 'STORAGEGROUP_LIST_CODE_MODAL';
const STORAGEGROUP_CREATE_MODAL = 'STORAGEGROUP_CREATE_MODAL';

class StorageGroupList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      storageGroupListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Storage Group';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api
        .listStorageGroup()
        .then((response) => this.setState({ storageGroupListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Storage Group List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { modalName, closeModal, openModal, history } = this.props;
    const { storageGroupListDocument } = this.state;
    return (
      <>
        <StorageGroupListTitle
          openCode={() => openModal({ modalName: STORAGEGROUP_LIST_CODE_MODAL })}
          openCreate={() => openModal({ modalName: STORAGEGROUP_CREATE_MODAL })}
          onRefresh={this.onRefresh}
        />
        {storageGroupListDocument && (
          <StorageGroupListCard storageGroupListDocument={storageGroupListDocument} />
        )}
        <CodeModal
          isOpen={modalName === STORAGEGROUP_LIST_CODE_MODAL}
          toggleDialogue={closeModal}
          code={storageGroupListDocument}
          title="StorageGroupListDocument"
        />
        <StorageGroupDialog
          isOpen={modalName === STORAGEGROUP_CREATE_MODAL}
          closeModal={closeModal}
          history={history}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  const {
    ui: { modalName },
  } = state;
  return {
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageGroupList);
