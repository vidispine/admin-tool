import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { compose } from 'redux';

import * as formActions from '../../formactions/imf';
import withFormActions from '../../hoc/withFormActions';
import withStepper from '../../hoc/withStepper';
import withUI from '../../hoc/withUI';
import MetadataForm from '../metadata/MetadataForm';
import SquareCard from '../ui/SquareCard';
import TitleHeader from '../ui/TitleHeader';

import ImportImpFileAdvancedForm from './ImportImpFileAdvancedForm';
import ImportImpFileForm from './ImportImpFileForm';

export const EDIT_IMPORTIMPFILE_FORM = 'EDIT_IMPORTIMPFILE_FORM';

function ImportImpFileWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  onNext,
  onBack,
  activeStep,
  openSnackBar,
}) {
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
        grandParentTitle="Import"
        parentTitle="IMF"
        title="File"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        actionComponent={
          <Button
            color="primary"
            variant="text"
            size="large"
            onClick={() => submitForm(EDIT_IMPORTIMPFILE_FORM)}
          >
            Start
          </Button>
        }
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>IMP File</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportImpFileForm
                  onSubmit={formActions.onImportImpFile}
                  initialValues={initialValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTIMPFILE_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button variant="text" color="primary" onClick={onNext}>
                  Next
                </Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Metadata</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <MetadataForm
                  onSubmit={formActions.onImportImpFile}
                  initialValues={initialValues}
                  form={EDIT_IMPORTIMPFILE_FORM}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button onClick={onBack}>Back</Button>
                <Button variant="text" color="primary" onClick={onNext}>
                  Next
                </Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Advanced</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportImpFileAdvancedForm
                  onSubmit={formActions.onImportImpFile}
                  initialValues={initialValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTIMPFILE_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button onClick={onBack}>Back</Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
}

export default compose(withStepper, withUI, withFormActions)(ImportImpFileWizard);
