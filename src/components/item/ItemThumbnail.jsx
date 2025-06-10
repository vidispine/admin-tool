import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import startCase from 'lodash.startcase';
import { compose } from 'redux';

import * as formActions from '../../formactions/item';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import ItemThumbnailForm from './ItemThumbnailForm';

const ITEM_THUMBNAIL_FORM = 'ITEM_THUMBNAIL_FORM';

function ItemThumbnail({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  variant,
  itemId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Thumbnail Job Created';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Thumbnail Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Start ${variant ? startCase(variant) : 'Thumbnail'} Job`}</DialogTitle>
      <DialogContent>
        <ItemThumbnailForm
          form={ITEM_THUMBNAIL_FORM}
          onSubmit={formActions.onCreateThumbnail}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          variant={variant}
          itemId={itemId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button size="small" color="secondary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(ITEM_THUMBNAIL_FORM)}>
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ItemThumbnail);
