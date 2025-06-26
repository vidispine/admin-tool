import { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import UriListTable from '../ui/UriListTable';

import FileUriForm from './FileUriForm';

const FILE_URI_FORM = 'FILE_URI_FORM';

function FileUri({ open, onClose, onSuccess, openSnackBar, submitForm, fileDocument }) {
  const [uriListDocument, setUriListDocument] = useState();
  if (fileDocument === undefined) {
    return null;
  }
  const { id: fileId } = fileDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'URI Generated';
    const { data } = response;
    if (data) setUriListDocument(data);
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Generating URI';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
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
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        {uriListDocument ? (
          <Button size="small" color="primary" onClick={() => setUriListDocument(undefined)}>
            Reset
          </Button>
        ) : (
          <Button size="small" color="primary" onClick={() => submitForm(FILE_URI_FORM)}>
            Generate
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileUri);
