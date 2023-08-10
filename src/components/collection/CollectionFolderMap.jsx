import React from 'react';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { collection as CollectionApi } from '@vidispine/vdt-api';

import * as formActions from '../../formactions/collection';
import CollectionFolderMapUpdateForm from './CollectionFolderMapUpdateForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import { metadataDocumentToKv } from '../../utils/metadataDocumentToKv';
import ErrorButton from '../ui/ErrorButton';

const COLLECTION_FOLDERMAPUPDATE_FORM = 'COLLECTION_FOLDERMAPUPDATE_FORM';

const stringToBool = (str, opt = {}) => {
  const strType = typeof str;
  if (strType === 'boolean') return str;
  if (str === 'true') return true;
  if (str === 'false') return false;
  const handler = opt?.strType;
  if (handler) {
    if (typeof handler === 'function') return handler(str, opt);
    return handler;
  }
  throw new Error(`Unknown type ${strType} for ${str}`);
};

function CollectionFolderMap({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  collectionId,
  form = COLLECTION_FOLDERMAPUPDATE_FORM,
}) {
  const [isFolderMapped, setIsFolderMapped] = React.useState(null);
  React.useEffect(() => {
    if (open === false || collectionId === undefined) return;
    CollectionApi.getCollectionMetadata({ collectionId, queryParams: { field: '__folder_mapped', interval: 'generic' } })
      .then(({ data: metadataDocument }) => {
        const mkv = metadataDocumentToKv(metadataDocument);
        const isFolderMappedStr = mkv?.timespan?.['-INF_+INF']?.field?.['__folder_mapped']?.[0];
        const isFolderMappedBool = stringToBool(isFolderMappedStr, { undefined: false });
        setIsFolderMapped(isFolderMappedBool);
      });
  }, [open, collectionId]);
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Folder Mapping Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Folder Mapping';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  const onMarkFolderCollection = () => CollectionApi.markFolderCollection({
    collectionId,
  })
    .then(() => {
      const messageContent = 'Folder Mapping Enabled';
      openSnackBar({ messageContent });
      if (onSuccess) { onSuccess(); }
      onClose();
    })
    .catch((error) => {
      const messageContent = 'Error Enabling Folder Mapping';
      openSnackBar({ messageContent, messageColor: 'secondary' });
      if (onFail) { onFail(error); }
    });
  const onUnMarkFolderCollection = () => CollectionApi.unMarkFolderCollection({
    collectionId,
  })
    .then(() => {
      const messageContent = 'Collection No Longer Marked Mapped';
      openSnackBar({ messageContent });
      if (onSuccess) { onSuccess(); }
      onClose();
    })
    .catch((error) => {
      const messageContent = 'Error Unmarking Folder Mapping';
      openSnackBar({ messageContent, messageColor: 'secondary' });
      if (onFail) { onFail(error); }
    });
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Folder Mapped Collection</DialogTitle>
      <DialogContent>
        {{
          true: (
            <div style={{
              display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
            }}
            >
              <CollectionFolderMapUpdateForm
                form={form}
                onSubmit={formActions.onUpdateFolderCollection}
                onSubmitSuccess={onSubmitSuccess}
                onSubmitFail={onSubmitFail}
                onCancel={onClose}
                collectionId={collectionId}
              />
              <Divider orientation="vertical" flexItem />
              <div>
                <ErrorButton
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={onUnMarkFolderCollection}
                >
                  Delete Mapping
                </ErrorButton>
              </div>
            </div>
          ),
          undefined: <CircularProgress />,
        }[isFolderMapped]}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        {{
          false: (
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={onMarkFolderCollection}
            >
              Enable
            </Button>
          ),
          true: (
            <Button
              size="small"
              color="primary"
              onClick={() => submitForm(form)}
            >
              Update
            </Button>
          ),
        }[isFolderMapped]}
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(CollectionFolderMap);
