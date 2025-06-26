import { useEffect } from 'react';

import { compose } from 'redux';

import ImportSidecarWizard, {
  EDIT_IMPORTSIDECAR_FORM,
} from '../../components/import/ImportSidecarWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportSidecar({ destroyForm, history, location, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Sidecar';

    return () => {
      destroyForm(EDIT_IMPORTSIDECAR_FORM);
    };
  }, [destroyForm]);

  const query = new URLSearchParams(location.search);
  const fileId = query.get('fileId');
  const itemId = query.get('itemId');

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return (
    <ImportSidecarWizard
      onSuccess={onSuccess}
      initialValues={{ itemId, queryParams: { sidecar: fileId } }}
      {...props}
    />
  );
}

export default compose(withRouterProps, withFormActions)(ImportSidecar);
