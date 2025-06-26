import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/storage';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import StorageListParamsForm from './StorageListParamsForm';

export const STORAGE_LIST_PARAMS_FORM = 'STORAGE_LIST_PARAMS_FORM';

function StorageListParams({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'STORAGE_LIST_PARAMS_FORM',
  initialValues = {},
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Storages';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Storage Params
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <StorageListParamsForm
          form={form}
          onSubmit={formActions.onList}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          destroyOnUnmount={false}
          initialValues={initialValues}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(form)}>
          Reset
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(form)}>
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withUI, withFormActions)(StorageListParams);
