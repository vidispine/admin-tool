import { compose } from 'redux';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import AccordionActions from '@material-ui/core/AccordionActions';

import { CollectionDocumentForm, CollectionQueryParamsForm } from '../collection/CollectionForm';
import SquareCard from '../ui/SquareCard';
import * as formActions from '../../formactions/collection';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import withStepper from '../../hoc/withStepper';
import TitleHeader from '../ui/TitleHeader';

export const EDIT_COLLECTION_FORM = 'EDIT_COLLECTION_FORM';

function ImportCollectionWizard({
  onSuccess,
  onFail,
  submitForm,
  onNext,
  onBack,
  activeStep,
  openSnackBar,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Collection Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Collection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <>
      <TitleHeader
        parentTitle="Import"
        title="Collection"
        helpTo="/ref/collection.html#create-a-collection"
      />
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Params</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <CollectionQueryParamsForm
                  onSubmit={formActions.onCreate}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_COLLECTION_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button variant="text" color="primary" onClick={onNext}>
                  Edit Collection Document
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => submitForm(EDIT_COLLECTION_FORM)}
                >
                  Create
                </Button>
              </AccordionActions>
            </SquareCard>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Collection Document</StepLabel>
          <StepContent>
            <SquareCard>
              <CardContent>
                <CollectionDocumentForm
                  onSubmit={formActions.onCreate}
                  onSubmitSuccess={onSubmitSuccess}
                  onSubmitFail={onSubmitFail}
                  form={EDIT_COLLECTION_FORM}
                  destroyOnUnmount={false}
                />
              </CardContent>
              <AccordionActions>
                <Button onClick={onBack}>Back</Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => submitForm(EDIT_COLLECTION_FORM)}
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

export default compose(withStepper, withUI, withFormActions)(ImportCollectionWizard);
