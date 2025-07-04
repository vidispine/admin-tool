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

import ImportShapePlaceholderForm from './ImportShapePlaceholderForm';

export const EDIT_IMPORTSHAPEPLACEHOLDER_FORM = 'EDIT_IMPORTSHAPEPLACEHOLDER_FORM';

function ImportShapePlaceholderWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  activeStep,
  openSnackBar,
}) {
  const defaultValues = {
    queryParams: {
      container: 1,
    },
    ...initialValues,
  };
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Placeholder Shape Created';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Placeholder Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <>
      <TitleHeader
        parentTitle="Import"
        title="Placeholder Shape"
        helpTo="/ref/item/shape.html#create-a-placeholder-shape"
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Params</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportShapePlaceholderForm
                  onSubmit={formActions.onCreateShapePlaceholder}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTSHAPEPLACEHOLDER_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => submitForm(EDIT_IMPORTSHAPEPLACEHOLDER_FORM)}
                >
                  Create
                </Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
}

export default compose(withStepper, withUI, withFormActions)(ImportShapePlaceholderWizard);
