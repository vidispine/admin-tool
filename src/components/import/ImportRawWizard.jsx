import { useMemo } from 'react';

import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { compose } from 'redux';

import * as formActions from '../../formactions/import';
import withFormActions from '../../hoc/withFormActions';
import withFormSelectors from '../../hoc/withFormSelectors';
import withStepper from '../../hoc/withStepper';
import withUI from '../../hoc/withUI';
import MetadataForm from '../metadata/MetadataForm';
import SquareCard from '../ui/SquareCard';
import TitleHeader from '../ui/TitleHeader';

import ImportRawForm from './ImportRawForm';

export const EDIT_IMPORTRAW_FORM = 'EDIT_IMPORTRAW_FORM';

function ImportRawWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  onNext,
  onBack,
  activeStep,
  openSnackBar,
  isFormSubmitting,
}) {
  const transferId = useMemo(
    () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    [],
  );
  const defaultValues = {
    queryParams: {
      transferId,
    },
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
        title="Upload"
        helpTo="/ref/item/import.html#import-using-a-passkey"
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Params</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <ImportRawForm
                  onSubmit={formActions.onImportRawNoAuth}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTRAW_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button variant="text" onClick={onNext}>
                  Edit Metadata
                </Button>
                <div style={{ position: 'relative' }}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => submitForm(EDIT_IMPORTRAW_FORM)}
                    disabled={isFormSubmitting}
                  >
                    Start
                  </Button>
                  {isFormSubmitting && (
                    <CircularProgress
                      size={24}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: -12,
                        marginLeft: -12,
                      }}
                    />
                  )}
                </div>
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
                  onSubmit={formActions.onImportRawNoAuth}
                  initialValues={defaultValues}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_IMPORTRAW_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button onClick={onBack}>Back</Button>
                <div style={{ position: 'relative' }}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => submitForm(EDIT_IMPORTRAW_FORM)}
                    disabled={isFormSubmitting}
                  >
                    Start
                  </Button>
                  {isFormSubmitting && (
                    <CircularProgress
                      size={24}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: -12,
                        marginLeft: -12,
                      }}
                    />
                  )}
                </div>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
}

export default compose(
  withStepper,
  withUI,
  withFormActions,
  withFormSelectors,
)(ImportRawWizard, EDIT_IMPORTRAW_FORM);
