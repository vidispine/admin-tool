import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { compose } from 'redux';

import * as formActions from '../../formactions/import';
import withFormActions from '../../hoc/withFormActions';
import withStepper from '../../hoc/withStepper';
import withUI from '../../hoc/withUI';
import MetadataForm from '../metadata/MetadataForm';
import SquareCard from '../ui/SquareCard';
import TitleHeader from '../ui/TitleHeader';

import ImportUriForm from './ImportUriForm';

export const EDIT_IMPORTURI_FORM = 'EDIT_IMPORTURI_FORM';

function ImportUriWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  onNext,
  onBack,
  activeStep,
  openSnackBar,
}) {
  const defaultValues = {
    queryParams: {},
    metadataDocument: {
      timespan: [
        {
          start: '-INF',
          end: '+INF',
        },
      ],
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
        title="URI"
        helpTo="/ref/item/import.html#import-using-a-uri"
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Params</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportUriForm
                  onSubmit={formActions.onImportUri}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTURI_FORM}
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
                  onClick={() => submitForm(EDIT_IMPORTURI_FORM)}
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
                  onSubmit={formActions.onImportUri}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTURI_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button onClick={onBack}>Back</Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => submitForm(EDIT_IMPORTURI_FORM)}
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

export default compose(withStepper, withUI, withFormActions)(ImportUriWizard);
