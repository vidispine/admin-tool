import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/item';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

import ItemUriParamsForm from './ItemUriParamsForm';

export const ITEM_URI_PARAMS_FORM = 'ITEM_URI_PARAMS_FORM';

function ItemUriParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  itemId,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Item URI Display Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Item URI Display';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Item URI Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ItemUriParamsForm
          form={ITEM_URI_PARAMS_FORM}
          onSubmit={formActions.onGetUri}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          {...formProps}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(ITEM_URI_PARAMS_FORM)}>
          Reset
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(ITEM_URI_PARAMS_FORM)}>
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions)(ItemUriParams);
