import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { compose } from 'redux';

import * as formActions from '../../formactions/shape';
import withFormActions from '../../hoc/withFormActions';
import withStepper from '../../hoc/withStepper';
import withUI from '../../hoc/withUI';
import SquareCard from '../ui/SquareCard';
import TitleHeader from '../ui/TitleHeader';

import ImportShapeForm from './ImportShapeForm';

export const EDIT_IMPORTSHAPE_FORM = 'EDIT_IMPORTSHAPE_FORM';

function ImportShapeWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  activeStep,
  openSnackBar,
}) {
  const defaultValues = {
    queryParams: {
      tag: ['original'],
    },
    ...initialValues,
  };
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Job Started';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Starting Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <>
      <TitleHeader
        parentTitle="Import"
        title="Shape"
        helpTo="/ref/item/shape.html#import-a-shape-using-a-uri-or-an-existing-file"
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Params</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportShapeForm
                  onSubmit={formActions.onCreateShapeImport}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTSHAPE_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => submitForm(EDIT_IMPORTSHAPE_FORM)}
                >
                  Start
                </Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
}

export default compose(withStepper, withUI, withFormActions)(ImportShapeWizard);
