import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import FileUriForm from './FileUriForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import UriListTable from '../ui/UriListTable';

const FILE_URI_FORM = 'FILE_URI_FORM';

function FileUri({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  fileDocument,
}) {
  if (fileDocument === undefined) { return null; }
  const [uriListDocument, setUriListDocument] = React.useState();
  const { id: fileId } = fileDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'URI Generated';
    const { data } = response;
    if (data) setUriListDocument(data);
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Generating URI';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>Generate Temporary URI</DialogTitle>
      <DialogContent>
        {uriListDocument ? (
          <UriListTable
            uriListDocument={uriListDocument}
            header={false}
            onClick={(uri) => window.open(uri)}
          />
        ) : (
          <FileUriForm
            form={FILE_URI_FORM}
            onSubmit={formActions.onCreateFileTemporaryCredentials}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={onSubmitFail}
            onCancel={onClose}
            fileId={fileId}
          />
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
        {uriListDocument ? (
          <Button
            size="small"
            color="primary"
            onClick={() => setUriListDocument(undefined)}
          >
            Reset
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={() => submitForm(FILE_URI_FORM)}
          >
            Generate
          </Button>

        )}
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileUri);
