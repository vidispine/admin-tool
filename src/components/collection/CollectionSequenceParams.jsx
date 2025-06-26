import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/collection';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

import CollectionSequenceParamsForm from './CollectionSequenceParamsForm';

export const COLLECTION_SEQUENCE_PARAMS_FORM = 'COLLECTION_SEQUENCE_PARAMS_FORM';

function CollectionSequenceParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Loading Collection Sequence';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Collection Sequence Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CollectionSequenceParamsForm
          form={COLLECTION_SEQUENCE_PARAMS_FORM}
          onSubmit={formActions.onGetCollectionSequence}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          initialValues={{ queryParams: { mode: 'COLLECTION_ORDER' } }}
          style={{ width: '100%' }}
          {...formProps}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(COLLECTION_SEQUENCE_PARAMS_FORM)}>
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(COLLECTION_SEQUENCE_PARAMS_FORM)}
        >
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions)(CollectionSequenceParams);
