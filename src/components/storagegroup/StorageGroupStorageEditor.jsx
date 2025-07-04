import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions';

import StorageGroupStorageDisplay from './StorageGroupStorageDisplay';
import StorageGroupStorageRemove from './StorageGroupStorageRemove';

const STORAGEGROUP_STORAGE_REMOVE_MODAL = 'STORAGEGROUP_STORAGE_REMOVE_MODAL';

function StorageGroupStorageEditor({
  storageDocument,
  openModal,
  modalName,
  openSnackBar,
  closeModal,
  groupName,
  onRefresh,
  storageId,
  history,
}) {
  return (
    <>
      <CardHeader
        subheader={storageDocument.id}
        action={
          <IconButton onClick={() => openModal({ modalName: STORAGEGROUP_STORAGE_REMOVE_MODAL })}>
            <Delete />
          </IconButton>
        }
      />
      <CardContent onClick={() => history.push(`/storage/${storageId}`)}>
        <StorageGroupStorageDisplay storageDocument={storageDocument} />
      </CardContent>
      <StorageGroupStorageRemove
        isOpen={modalName === STORAGEGROUP_STORAGE_REMOVE_MODAL}
        groupName={groupName}
        storageId={storageId}
        openSnackBar={openSnackBar}
        closeModal={closeModal}
        onRefresh={onRefresh}
      />
    </>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StorageGroupStorageEditor));
