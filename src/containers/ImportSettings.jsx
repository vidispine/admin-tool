import { PureComponent } from 'react';

import { connect } from 'react-redux';

import { importsettings as ImportSettingsApi } from '@vidispine/vdt-api';

import * as actions from '../actions';
import ImportSettingsCard from '../components/importsettings/ImportSettingsCard';
import ImportSettingsRemove from '../components/importsettings/ImportSettingsRemove';
import ImportSettingsTitle from '../components/importsettings/ImportSettingsTitle';
import CodeModal from '../components/ui/CodeModal';

const IMPORTSETTINGS_CODE_MODAL = 'IMPORTSETTINGS_CODE_MODAL';
const IMPORTSETTINGS_REMOVE_MODAL = 'IMPORTSETTINGS_REMOVE_MODAL';

class ImportSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      importSettingsDocument: undefined,
    };
  }

  componentDidMount() {
    const { settingsId } = this.props;
    document.title = `VidiCore Admin | Import Settings | ${settingsId}`;
    this.onRefresh();
  }

  async onRefresh() {
    const { openSnackBar, settingsId } = this.props;
    try {
      const { data: importSettingsDocument } = await ImportSettingsApi.getImportSettings({
        settingsId,
      });
      this.setState({ importSettingsDocument });
    } catch (error) {
      const messageContent = 'Error Loading Import Settings';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  onRemove({ settingsId }) {
    const { openSnackBar, history, closeModal } = this.props;
    try {
      ImportSettingsApi.removeImportSettings({ settingsId }).then(() => {
        const messageContent = `Import Settings ${settingsId} Removed`;
        openSnackBar({ messageContent });
        history.push('/import/settings/');
        closeModal();
      });
    } catch (error) {
      const messageContent = 'Error Removing Import Settings';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { modalName, closeModal, openModal, settingsId } = this.props;
    const { importSettingsDocument } = this.state;
    return (
      <>
        <ImportSettingsTitle
          settingsId={settingsId}
          openCode={() => openModal({ modalName: IMPORTSETTINGS_CODE_MODAL })}
          openRemove={() => openModal({ modalName: IMPORTSETTINGS_REMOVE_MODAL })}
          onRefresh={this.onRefresh}
        />
        {importSettingsDocument && (
          <ImportSettingsCard
            settingsId={settingsId}
            importSettingsDocument={importSettingsDocument}
            onRefresh={this.onRefresh}
          />
        )}
        <CodeModal
          isOpen={modalName === IMPORTSETTINGS_CODE_MODAL}
          toggleDialogue={closeModal}
          code={importSettingsDocument}
          title="ImportSettingsDocument"
        />
        <ImportSettingsRemove
          isOpen={modalName === IMPORTSETTINGS_REMOVE_MODAL}
          closeModal={closeModal}
          onRemove={this.onRemove}
          settingsId={settingsId}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { settingsId } = ownProps.match.params;
  const {
    ui: { modalName },
  } = state;
  return {
    settingsId,
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSettings);
