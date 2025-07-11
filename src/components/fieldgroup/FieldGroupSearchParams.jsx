import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/fieldgroup';
import withExpansion from '../../hoc/withExpansion';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

import FieldGroupSearchParamsForm from './FieldGroupSearchParamsForm';

export const FIELDGROUP_SEARCH_PARAMS_FORM = 'FIELDGROUP_SEARCH_PARAMS_FORM';

function FieldGroupSearchParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  expanded,
  onChangeExpansion,
  form = FIELDGROUP_SEARCH_PARAMS_FORM,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onChangeExpansion) {
      onChangeExpansion(null, false);
    }
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Searching Field Groups';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion expanded={expanded} onChange={onChangeExpansion}>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Field Group Search Params
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FieldGroupSearchParamsForm
          form={form}
          onSubmit={formActions.onSearch}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
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

export default compose(withSnackbar, withFormActions, withExpansion)(FieldGroupSearchParams);
