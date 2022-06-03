import React from 'react';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Accordion from '../ui/Accordion';

import * as formActions from '../../formactions/shape';
import ShapeFileParamsForm from './ShapeFileParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

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
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Requesting File';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

export default compose(withUI, withFormActions)(ShapeFileParams);
