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
import withUI from '../../hoc/withUI';

import ShapeFileParamsForm from './ShapeFileParamsForm';

function ShapeFileParams({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'SHAPE_FILE_PARAMS_FORM',
  initialValues = {},
  itemId,
  shapeId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Requesting File';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          File Params
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ShapeFileParamsForm
          form={form}
          onSubmit={formActions.onGetShapeFileList}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          destroyOnUnmount={false}
          initialValues={initialValues}
          itemId={itemId}
          shapeId={shapeId}
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

export default compose(withUI, withFormActions)(ShapeFileParams);
