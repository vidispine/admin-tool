import { useEffect } from 'react';

import { compose } from 'redux';

import ImportUriWizard, { EDIT_IMPORTURI_FORM } from '../../components/import/ImportUriWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportUri({ destroyForm, history, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | URI';

    return () => {
      destroyForm(EDIT_IMPORTURI_FORM);
    };
  }, [destroyForm]);

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return <ImportUriWizard onSuccess={onSuccess} {...props} />;
}

export default compose(withRouterProps, withFormActions)(ImportUri);
