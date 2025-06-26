import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/shape';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

import ShapeParamsForm from './ShapeParamsForm';

export const SHAPE_PARAMS_FORM = 'SHAPE_PARAMS_FORM';

function ShapeParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  itemId,
  shapeId,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Shape Display Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Shape Display';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Shape Display Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ShapeParamsForm
          form={SHAPE_PARAMS_FORM}
          onSubmit={formActions.onGet}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          shapeId={shapeId}
          {...formProps}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(SHAPE_PARAMS_FORM)}>
          Reset
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(SHAPE_PARAMS_FORM)}>
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions)(ShapeParams);
