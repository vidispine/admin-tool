import { useEffect } from 'react';

import { compose } from 'redux';

import ImportFileWizard, { EDIT_IMPORTFILE_FORM } from '../../components/import/ImportFileWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportFile({ destroyForm, history, location, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | File';

    return () => {
      destroyForm(EDIT_IMPORTFILE_FORM);
    };
  }, [destroyForm]);

  const query = new URLSearchParams(location.search);
  const fileId = query.get('fileId');

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return (
    <ImportFileWizard
      onSuccess={onSuccess}
      initialValues={{ fileId, metadataDocument: {} }}
      {...props}
    />
  );
}

export default compose(withRouterProps, withFormActions)(ImportFile);
