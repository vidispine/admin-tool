import Button from '@material-ui/core/Button';
import { compose } from 'redux';

import * as formActions from '../../formactions/item';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import TextGrid from '../ui/TextGrid';

import ItemProjectionForm from './ItemProjectionForm';

export const ITEM_PROJECTION_FORM = 'ITEM_PROJECTION_FORM';

function ItemProjection({
  submitForm,
  openSnackBar,
  onSuccess,
  onFail,
  itemId,
  outgoingProjectionDocument,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Projection Applied';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Appying Projection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <>
      <ItemProjectionForm
        form={ITEM_PROJECTION_FORM}
        onSubmit={formActions.onGetMetadata}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
        itemId={itemId}
        headers={{ accept: 'application/xml' }}
        initialValues={{
          queryParams: {
            projection: 'default',
          },
        }}
      />
      <Button color="primary" variant="contained" onClick={() => submitForm(ITEM_PROJECTION_FORM)}>
        Update
      </Button>
      {outgoingProjectionDocument && (
        <TextGrid title="Projection" value={outgoingProjectionDocument} variant="xml" hideNoValue />
      )}
    </>
  );
}

export default compose(withUI, withFormActions)(ItemProjection);
