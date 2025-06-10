import { PureComponent } from 'react';

import { connect } from 'react-redux';

import { importsettings as ImportSettingsApi } from '@vidispine/vdt-api';

import * as actions from '../actions';
import ImportSettingsDialog from '../components/importsettings/ImportSettingsDialog';
import ImportSettingsListCard from '../components/importsettings/ImportSettingsListCard';
import ImportSettingsListTitle from '../components/importsettings/ImportSettingsListTitle';
import CodeModal from '../components/ui/CodeModal';

const IMPORTSETTINGSLIST_CODE_MODAL = 'IMPORTSETTINGSLIST_CODE_MODAL';
const IMPORTSETTINGS_CREATE_MODAL = 'IMPORTSETTINGS_CREATE_MODAL';

class ImportSettingsList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Import Settings';
    this.onRefresh();
  }

  async onRefresh() {
    const { openSnackBar } = this.props;
    try {
      const { data: uriListDocument } = await ImportSettingsApi.listImportSettings();
      this.setState({ uriListDocument });
    } catch (error) {
      const messageContent = 'Error Loading Import Settings';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { modalName, closeModal, openModal, history } = this.props;
    const { uriListDocument } = this.state;
    return (
      <>
        <ImportSettingsListTitle
          openCode={() => openModal({ modalName: IMPORTSETTINGSLIST_CODE_MODAL })}
          openCreate={() => openModal({ modalName: IMPORTSETTINGS_CREATE_MODAL })}
          onRefresh={this.onRefresh}
        />
        {uriListDocument && <ImportSettingsListCard uriListDocument={uriListDocument} />}
        <CodeModal
          isOpen={modalName === IMPORTSETTINGSLIST_CODE_MODAL}
          toggleDialogue={closeModal}
          code={uriListDocument}
          title="URIListDocument"
        />
        <ImportSettingsDialog
          isOpen={modalName === IMPORTSETTINGS_CREATE_MODAL}
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

export default connect(mapStateToProps, mapDispatchToProps)(ImportSettingsList);
