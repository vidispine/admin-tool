import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/shapetag';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import ShapeTagScriptTestParamsForm from './ShapeTagScriptTestParamsForm';

export const SHAPETAG_SCRIPT_TEST_PARAMS_FORM = 'SHAPETAG_SCRIPT_TEST_PARAMS_FORM';

function ShapeTagScriptTestParams({
  tagName,
  itemId,
  shapeId,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'SHAPETAG_SCRIPT_TEST_PARAMS_FORM',
  initialValues = {},
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Testing Shape Tag';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Shape Tag Script Test
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ShapeTagScriptTestParamsForm
          form={form}
          onSubmit={formActions.onTestShapeTagScript}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          destroyOnUnmount={false}
          initialValues={initialValues}
          tagName={tagName}
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
          Test
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withUI, withFormActions)(ShapeTagScriptTestParams);
