import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/metadatafield';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

import MetadataFieldMergedAccessParamsForm from './MetadataFieldMergedAccessParamsForm';

export const METADATAFIELDMERGEDACCESS_PARAMS_FORM = 'METADATAFIELDMERGEDACCESS_PARAMS_FORM';

function MetadataFieldMergedAccessParams({
  onSubmit = formActions.onGetMergedAccess,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  fieldName,
  groupName,
  form = METADATAFIELDMERGEDACCESS_PARAMS_FORM,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Merged Access Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Merged Access';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Query Params
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MetadataFieldMergedAccessParamsForm
          form={form}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          fieldName={fieldName}
          groupName={groupName}
          {...formProps}
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

export default compose(withSnackbar, withFormActions)(MetadataFieldMergedAccessParams);
