import { useEffect } from 'react';

import ImportImpPathWizard, {
  EDIT_IMPORTIMPPATH_FORM,
} from '../../components/imf/ImportImpPathWizard';
import withFormActions from '../../hoc/withFormActions';

function ImportImpPath({ history, destroyForm }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | IMF | Import Path';

    return () => {
      destroyForm(EDIT_IMPORTIMPPATH_FORM);
    };
  }, [destroyForm]);

  return (
    <ImportImpPathWizard
      initialValues={{ metadataDocument: {} }}
      onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
    />
  );
}

export default withFormActions(ImportImpPath);
