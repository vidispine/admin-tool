import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/library';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

import LibraryContentParamsForm from './LibraryContentParamsForm';

export const LIBRARY_CONTENT_PARAMS_FORM = 'LIBRARY_CONTENT_PARAMS_FORM';

function LibraryContentParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  libraryId,
  expanded,
  onChangeExpansion,
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
    const messageContent = 'Error Updating Library Display';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion expanded={expanded} onChange={onChangeExpansion}>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Library Content Display Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <LibraryContentParamsForm
          form={LIBRARY_CONTENT_PARAMS_FORM}
          onSubmit={formActions.onGet}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          libraryId={libraryId}
          {...formProps}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(LIBRARY_CONTENT_PARAMS_FORM)}>
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(LIBRARY_CONTENT_PARAMS_FORM)}
        >
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions)(LibraryContentParams);
