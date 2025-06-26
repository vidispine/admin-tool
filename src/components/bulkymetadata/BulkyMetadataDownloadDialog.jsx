import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/bulkymetadata';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import downloadFile from '../../utils/downloadFile';
import DialogContent from '../ui/DialogContent';

import BulkyMetadataDownloadForm from './BulkyMetadataDownloadForm';

const BULKYMETADATA_DOWNLOAD_FORM = 'BULKYMETADATA_DOWNLOAD_FORM';

const filenameFromHeaders = (headers = {}) => {
  const { 'content-disposition': contentDisposition } = headers;
  if (contentDisposition === undefined) return undefined;
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(contentDisposition);
  const filenameString = matches?.[1];
  if (filenameString === undefined) return undefined;
  return filenameString.replace(/['"]/g, '');
};

function BulkyMetadataDownloadDialog({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  itemId,
  shapeId,
  componentId,
  bulkyMetadataKey,
  form = BULKYMETADATA_DOWNLOAD_FORM,
}) {
  let onSubmit = formActions.onGetItemBulkyMetadataAsFile;
  if (shapeId) onSubmit = formActions.onGetShapeBulkyMetadataAsFile;
  else if (componentId) onSubmit = formActions.onGetComponentBulkyMetadataAsFile;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Download Started';
    openSnackBar({ messageContent });
    const { data, headers } = response;
    const fileName = filenameFromHeaders(headers) || bulkyMetadataKey;
    downloadFile({ data, fileName });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Starting Download';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Download ${bulkyMetadataKey}`}</DialogTitle>
      <DialogContent>
        <BulkyMetadataDownloadForm
          form={form}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          shapeId={shapeId}
          componentId={componentId}
          bulkyMetadataKey={bulkyMetadataKey}
          initialValues={{ queryParams: { start: '-INF', end: '+INF' } }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(form)}>
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(BulkyMetadataDownloadDialog);
