import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import withFormActions from '../../hoc/withFormActions';
import withStepper from '../../hoc/withStepper';
import withUI from '../../hoc/withUI';
import MetadataForm from '../metadata/MetadataForm';
import SquareCard from '../ui/SquareCard';
import TitleHeader from '../ui/TitleHeader';

import ImportFileForm from './ImportFileForm';

export const EDIT_IMPORTFILE_FORM = 'EDIT_IMPORTFILE_FORM';

function ImportFileWizard({
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
  const defaultValues = { ...initialValues };
  return (
    <>
      <TitleHeader
        parentTitle="Import"
        title="File"
        helpTo="/ref/storage/file.html#import-a-file"
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Params</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportFileForm
                  onSubmit={formActions.onFileImport}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTFILE_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button variant="text" onClick={onNext}>
                  Edit Metadata
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => submitForm(EDIT_IMPORTFILE_FORM)}
                >
                  Start
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
                  onSubmit={formActions.onFileImport}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTFILE_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button onClick={onBack}>Back</Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => submitForm(EDIT_IMPORTFILE_FORM)}
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

export default compose(withStepper, withUI, withFormActions)(ImportFileWizard);
