import { useEffect } from 'react';

import ImportImpFileWizard, {
  EDIT_IMPORTIMPFILE_FORM,
} from '../../components/imf/ImportImpFileWizard';
import withFormActions from '../../hoc/withFormActions';

function ImportImpFile({ history, location, destroyForm }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | IMF | Import File';

    return () => {
      destroyForm(EDIT_IMPORTIMPFILE_FORM);
    };
  }, [destroyForm]);

  const query = new URLSearchParams(location.search);
  const fileId = query.get('fileId');

  return (
    <ImportImpFileWizard
      initialValues={{ fileId, metadataDocument: {} }}
      onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
    />
  );
}

export default withFormActions(ImportImpFile);
