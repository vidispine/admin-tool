import { useEffect } from 'react';

import { compose } from 'redux';

import ImportSidecarRawWizard, {
  EDIT_IMPORTSIDECARRAW_FORM,
} from '../../components/import/ImportSidecarRawWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportSidecarRaw({ destroyForm, history, location, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Sidecar Upload';

    return () => {
      destroyForm(EDIT_IMPORTSIDECARRAW_FORM);
    };
  }, [destroyForm]);

  const query = new URLSearchParams(location.search);
  const itemId = query.get('itemId');

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return (
    <ImportSidecarRawWizard
      onSuccess={onSuccess}
      initialValues={{ itemId, queryParams: {} }}
      {...props}
    />
  );
}

export default compose(withRouterProps, withFormActions)(ImportSidecarRaw);
