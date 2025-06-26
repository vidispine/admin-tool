import { PureComponent } from 'react';

import { connect } from 'react-redux';

import { access as AccessApi } from '@vidispine/vdt-api';

import * as actions from '../actions';
import ImportAccessCard from '../components/importaccess/ImportAccessCard';
import ImportAccessDialog from '../components/importaccess/ImportAccessDialog';
import ImportAccessRemove from '../components/importaccess/ImportAccessRemove';
import ImportAccessTitle from '../components/importaccess/ImportAccessTitle';
import CodeModal from '../components/ui/CodeModal';

const IMPORTACCESS_CODE_MODAL = 'IMPORTACCESS_CODE_MODAL';
const IMPORTACCESS_REMOVE_MODAL = 'IMPORTACCESS_REMOVE_MODAL';
const IMPORTACCESS_EDIT_MODAL = 'IMPORTACCESS_EDIT_MODAL';

class ImportSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.openRemove = this.openRemove.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.state = {
      importAccessControlListDocument: undefined,
    };
  }

  componentDidMount() {
    const { userName } = this.props;
    document.title = `VidiCore Admin | User | ${userName} | Import Access`;
    this.onRefresh();
  }

  async onRefresh() {
    const { openSnackBar, userName } = this.props;
    const headers = { RunAs: userName };
    try {
      const { data: importAccessControlListDocument } = await AccessApi.getImportAccess({
        headers,
      });
      this.setState({ importAccessControlListDocument });
    } catch (error) {
      const messageContent = 'Error Loading Import Settings';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  onRemove(groupName) {
    const { openSnackBar, closeModal, userName } = this.props;
    const headers = { RunAs: userName };
    return () => {
      AccessApi.removeImportAccessGroup({ groupName, headers })
        .then(() => {
          const messageContent = `Import Access "${groupName}" Removed`;
          openSnackBar({ messageContent });
          closeModal();
          this.onRefresh();
        })
        .catch(() => {
          const messageContent = 'Error Removing Import Access';
          openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    };
  }

  openRemove(currentGroup) {
    const { openModal } = this.props;
    return () => {
      const onOpen = () => openModal({ modalName: IMPORTACCESS_REMOVE_MODAL });
      this.setState({ currentGroup }, onOpen);
    };
  }

  openEdit(currentGroup) {
    const { openModal } = this.props;
    return () => {
      const onOpen = () => openModal({ modalName: IMPORTACCESS_EDIT_MODAL });
      this.setState({ currentGroup }, onOpen);
    };
  }

  render() {
    const { modalName, closeModal, openModal, userName } = this.props;
    const { importAccessControlListDocument, currentGroup } = this.state;
    return (
      <>
        <ImportAccessTitle
          openCode={() => openModal({ modalName: IMPORTACCESS_CODE_MODAL })}
          openCreate={() => openModal({ modalName: IMPORTACCESS_EDIT_MODAL })}
          onRefresh={this.onRefresh}
          userName={userName}
        />
        {importAccessControlListDocument && (
          <ImportAccessCard
            importAccessControlListDocument={importAccessControlListDocument}
            openRemove={this.openRemove}
            openEdit={this.openEdit}
          />
        )}
        <CodeModal
          isOpen={modalName === IMPORTACCESS_CODE_MODAL}
          toggleDialogue={closeModal}
          code={importAccessControlListDocument}
          title="ImportAccessControlListDocument"
        />
        {currentGroup && (
          <ImportAccessRemove
            isOpen={modalName === IMPORTACCESS_REMOVE_MODAL}
            closeModal={closeModal}
            onRemove={this.onRemove}
            groupName={currentGroup.name}
          />
        )}
        <ImportAccessDialog
          isOpen={modalName === IMPORTACCESS_EDIT_MODAL}
          closeModal={closeModal}
          onRefresh={this.onRefresh}
          group={currentGroup}
          userName={userName}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {
    ui: { modalName },
  } = state;
  const { userName } = ownProps.match.params;
  return {
    userName,
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSettings);
