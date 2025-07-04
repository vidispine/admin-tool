import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';

import * as formActions from '../../formactions/conform';
import SquareCard from '../ui/SquareCard';

import ConformForm from './ConformForm';
import ConformMetadataForm from './ConformMetadataForm';
import ConformParamsForm from './ConformParamsForm';

export const EDIT_CONFORM_FORM = 'EDIT_CONFORM_FORM';

function ConformCreate({ submitForm, history }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    formActions.onCreateSubmitSuccess(response, dispatch, props);
    const { jobDocument } = response;
    const { jobId } = jobDocument;
    if (history) {
      history.push(`/job/${jobId}`);
    }
  };
  const queryParams = {
    tag: ['original'],
  };
  return (
    <>
      <Grid container justifyContent="space-between">
        <Typography variant="h5" color="textSecondary" style={{ textDecoration: 'none' }}>
          Timeline
        </Typography>
        <Button color="primary" onClick={() => submitForm(EDIT_CONFORM_FORM)}>
          Start Conform
        </Button>
      </Grid>
      <ConformForm
        form={EDIT_CONFORM_FORM}
        onSubmit={formActions.onCreateSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={formActions.onCreateSubmitFail}
      />
      <Typography variant="h5" color="textSecondary" style={{ textDecoration: 'none' }}>
        Settings
      </Typography>
      <SquareCard>
        <CardContent>
          <ConformParamsForm
            form={EDIT_CONFORM_FORM}
            onSubmit={formActions.onCreateSubmit}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={formActions.onCreateSubmitFail}
            initialValues={{ queryParams }}
          />
        </CardContent>
      </SquareCard>
      <Typography variant="h5" color="textSecondary" style={{ textDecoration: 'none' }}>
        Metadata
      </Typography>
      <ConformMetadataForm
        form={EDIT_CONFORM_FORM}
        onSubmit={formActions.onCreateSubmit}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={formActions.onCreateSubmitFail}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  submitting: isSubmitting(EDIT_CONFORM_FORM)(state),
});

const mapDispatchToProps = {
  submitForm: submit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConformCreate);
