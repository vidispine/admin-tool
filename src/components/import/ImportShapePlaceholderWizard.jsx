import React from 'react';
import { compose } from 'redux';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import ImportShapePlaceholderForm from './ImportShapePlaceholderForm';
import SquareCard from '../ui/SquareCard';
import * as formActions from '../../formactions/shape';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import withStepper from '../../hoc/withStepper';
import TitleHeader from '../ui/TitleHeader';

export const EDIT_IMPORTSHAPEPLACEHOLDER_FORM = 'EDIT_IMPORTSHAPEPLACEHOLDER_FORM';

function ImportShapePlaceholderWizard({
  initialValues,
  onSuccess,
  onFail,
  submitForm,
  openSnackBar,
}) {
  const defaultValues = {
    queryParams: {
      container: 1,
      tag: ['original'],
    },
    ...initialValues,
  };
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Placeholder Shape Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Placeholder Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <>
      <TitleHeader
        parentTitle="Import"
        title="Placeholder Shape"
        style={{ paddingTop: 10, paddingBottom: 10 }}
        actionComponent={(
          <Button
            color="primary"
            variant="text"
            size="large"
            onClick={() => submitForm(EDIT_IMPORTSHAPEPLACEHOLDER_FORM)}
          >
            Create
          </Button>
        )}
      />
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
      </SquareCard>
    </>

  );
}

export default compose(withStepper, withUI, withFormActions)(ImportShapePlaceholderWizard);
