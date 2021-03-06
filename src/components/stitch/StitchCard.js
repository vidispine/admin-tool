import React from 'react';
import { compose } from 'redux';
import CardContent from '@material-ui/core/CardContent';
import AccordionActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import withSnackbar from '../../hoc/withSnackbar';
import withFormActions from '../../hoc/withFormActions';
import SquareCard from '../ui/SquareCard';
import * as formActions from '../../formactions/stitch';

import StitchForm from './StitchForm';

export const STITCH_FORM = 'STITCH_FORM';

function StitchCard({
  submitForm,
  resetForm,
  openSnackBar,
  onSuccess,
  onFail,
  url,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Image Stitched';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (errors, dispatch, submitError, props) => {
    const messageContent = 'Error Stitching Image';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(errors, dispatch, submitError, props); }
  };
  return (
    <>
      <SquareCard>
        <CardContent>
          <StitchForm
            onSubmit={formActions.onGetStitch}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={onSubmitFail}
            form={STITCH_FORM}
          />
        </CardContent>
        <AccordionActions>
          <Button
            size="small"
            onClick={() => resetForm(STITCH_FORM)}
          >
            Reset
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => submitForm(STITCH_FORM)}
          >
            Get
          </Button>
        </AccordionActions>
      </SquareCard>
      <SquareCard>
        <CardContent>
          <Grid container justifyContent="center">
            {url && (
              <img src={url} alt={url} />
            )}
          </Grid>
        </CardContent>
      </SquareCard>
    </>
  );
}

export default compose(withSnackbar, withFormActions)(StitchCard);
