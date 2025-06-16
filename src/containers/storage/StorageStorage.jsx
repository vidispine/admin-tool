import { PureComponent } from 'react';

import { storage as StorageApi } from '@vidispine/vdt-api';

import StorageCard from '../../components/storage/StorageCard';
import StorageEvacuate from '../../components/storage/StorageEvacuate';
import StorageEvacuateCancel from '../../components/storage/StorageEvacuateCancel';
import StorageMethodDialog from '../../components/storage/StorageMethodDialog';
import StorageRemove from '../../components/storage/StorageRemove';
import StorageType from '../../components/storage/StorageType';
import { OK_STATES } from '../../const/StorageStates';
import withUI from '../../hoc/withUI';

const STORAGE_REMOVE_MODAL = 'STORAGE_REMOVE_MODAL';

const STORAGEMETHOD_CREATE_MODAL = 'STORAGEMETHOD_CREATE_MODAL';
const STORAGE_TYPE_DIALOG = 'STORAGE_TYPE_DIALOG';
const STORAGE_EVACUATE_DIALOG = 'STORAGE_EVACUATE_DIALOG';
const STORAGE_EVACUATE_CANCEL_DIALOG = 'STORAGE_EVACUATE_CANCEL_DIALOG';

class StorageStorage extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onRescan = this.onRescan.bind(this);
    this.onRescanError = this.onRescanError.bind(this);
    this.state = {
      storageDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ storageId }) {
    const { storageId: prevStorageId } = this.props;
    if (prevStorageId !== storageId) {
      this.onFetch(storageId);
      document.title = `VidiCore Admin | Storage | ${storageId}`;
    }
  }

  onRefresh() {
    const { storageId } = this.props;
    this.onFetch(storageId);
  }

  onFetch(storageId) {
    try {
      StorageApi.getStorage({ storageId })
        .then((response) => this.setState({ storageDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Storage';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onRescan() {
    const { storageId, openSnackBar } = this.props;
    try {
      StorageApi.rescanStorage({ storageId })
        .then(() => {
          const messageContent = 'Rescan Started';
          openSnackBar({ messageContent });
          this.onRefresh();
        })
        .catch((error) => this.onRescanError(error));
    } catch (error) {
      this.onRescanError(error);
    }
  }

  onRescanError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Rescanning Storage';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      storageId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      onOpen,
      history,
    } = this.props;
    const { storageDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={storageDocument}
            codeModal="StorageDocument"
            onRefresh={this.onRefresh}
            onRescan={this.onRescan}
            menuList={[
              {
                label: 'Change Storage Type',
                modalName: STORAGE_TYPE_DIALOG,
              },
              {
                label: 'Rescan',
                onClick: this.onRescan,
              },
              {
                label: OK_STATES.includes(storageDocument?.state) ? 'Evacuate Storage' : null,
                modalName: STORAGE_EVACUATE_DIALOG,
                color: 'secondary',
              },
              {
                label: storageDocument?.state === 'EVACUATING' ? 'Cancel Evacuate Storage' : null,
                modalName: STORAGE_EVACUATE_CANCEL_DIALOG,
                color: 'secondary',
              },
              {
                label: 'Delete Storage',
                modalName: STORAGE_TYPE_DIALOG,
                color: 'secondary',
              },
            ]}
          />
        )}
        {TabComponent && <TabComponent />}
        {storageDocument && (
          <StorageCard
            onRefresh={this.onRefresh}
            storageId={storageId}
            storageDocument={storageDocument}
            openMethodCreate={() => onOpen({ modalName: STORAGEMETHOD_CREATE_MODAL })}
          />
        )}

        <StorageMethodDialog
          dialogName={STORAGEMETHOD_CREATE_MODAL}
          onRefresh={this.onRefresh}
          storageId={storageId}
        />
        <StorageType
          dialogName={STORAGE_TYPE_DIALOG}
          storageDocument={storageDocument}
          onSuccess={this.onRefresh}
        />
        <StorageEvacuate
          dialogName={STORAGE_EVACUATE_DIALOG}
          storageDocument={storageDocument}
          onSuccess={this.onRefresh}
        />
        <StorageEvacuateCancel
          dialogName={STORAGE_EVACUATE_CANCEL_DIALOG}
          storageDocument={storageDocument}
          onSuccess={this.onRefresh}
        />
        <StorageRemove
          dialogName={STORAGE_REMOVE_MODAL}
          onSuccess={() => history.push('/storage/')}
          storageId={storageId}
        />
      </>
    );
  }
}

export default withUI(StorageStorage);
