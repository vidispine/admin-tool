import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Accordion from '@material-ui/core/Accordion';
import { compose } from 'redux';

import * as formActions from '../../formactions/analyzepreset';
import AnalyzePresetListParamsForm from './AnalyzePresetListParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

export const ANALYSEPRESETLISTPARAMS_FORM = 'ANALYSEPRESETLISTPARAMS_FORM';

function AnalyzePresetListParams({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = ANALYSEPRESETLISTPARAMS_FORM,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Analyze Presets';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Query Params
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AnalyzePresetListParamsForm
          form={form}
          onSubmit={formActions.onListAnalyzePreset}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={{ queryParams: { includeDocument: false } }}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          size="small"
          onClick={() => resetForm(form)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(form)}
        >
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withUI, withFormActions)(AnalyzePresetListParams);
