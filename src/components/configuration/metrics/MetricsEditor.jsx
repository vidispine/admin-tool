import * as formActions from '../../../formactions/configuration';
import withSnackbar from '../../../hoc/withSnackbar';
import Editor from '../../ui/Editor';

import MetricsDisplay from './MetricsDisplay';
import MetricsForm from './MetricsForm';

function MetricsEditor({ metricsConfigurationDocument, openSnackBar, onSuccess }) {
  const EDIT_METRICS_FORM = 'EDIT_METRICS_FORM';
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Metrics Configuration Updated';
    openSnackBar({ messageContent });
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Metrics Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Editor
      formName={EDIT_METRICS_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateMetricsConfiguration}
      displayProps={{ metricsConfigurationDocument }}
      initialValues={{ metricsConfigurationDocument }}
      formComponent={MetricsForm}
      displayComponent={MetricsDisplay}
    />
  );
}

export default withSnackbar(MetricsEditor);
