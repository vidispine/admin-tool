import { useEffect } from 'react';

import { compose } from 'redux';

import ImportRawWizard, { EDIT_IMPORTRAW_FORM } from '../../components/import/ImportRawWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportRaw({ destroyForm, history, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Upload';

    return () => {
      destroyForm(EDIT_IMPORTRAW_FORM);
    };
  }, [destroyForm]);

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return <ImportRawWizard onSuccess={onSuccess} {...props} />;
}

export default compose(withRouterProps, withFormActions)(ImportRaw);
