import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/fieldgroup';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import FieldGroupParamsForm from './FieldGroupParamsForm';

export const FIELDGROUP_PARAMS_FORM = 'FIELDGROUP_PARAMS_FORM';

function FieldGroupParams({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'FIELDGROUP_PARAMS_FORM',
  groupName,
  initialValues = {},
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Refresh Field Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Field Group Params
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FieldGroupParamsForm
          form={form}
          onSubmit={formActions.onGetFieldGroup}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          destroyOnUnmount={false}
          groupName={groupName}
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

export default compose(withUI, withFormActions)(FieldGroupParams);
