import { useEffect } from 'react';

import { compose } from 'redux';

import ImportImpUrlWizard, {
  EDIT_IMPORTIMPURL_FORM,
} from '../../components/imf/ImportImpUrlWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportImpUrl({ destroyForm, history, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | IMF | Import URL';

    return () => {
      destroyForm(EDIT_IMPORTIMPURL_FORM);
    };
  }, [destroyForm]);

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return (
    <ImportImpUrlWizard initialValues={{ metadataDocument: {} }} onSuccess={onSuccess} {...props} />
  );
}

export default compose(withRouterProps, withFormActions)(ImportImpUrl);
