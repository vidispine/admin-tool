import { useEffect } from 'react';

import { compose } from 'redux';

import ImportComponentWizard, {
  EDIT_IMPORTCOMPONENT_FORM,
} from '../../components/import/ImportComponentWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportComponent({ destroyForm, history, location, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Component';

    return () => {
      destroyForm(EDIT_IMPORTCOMPONENT_FORM);
    };
  }, [destroyForm]);

  const query = new URLSearchParams(location.search);
  const fileId = query.get('fileId');
  const itemId = query.get('itemId');

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return (
    <ImportComponentWizard
      onSuccess={onSuccess}
      initialValues={{ itemId, queryParams: { fileId } }}
      {...props}
    />
  );
}

export default compose(withRouterProps, withFormActions)(ImportComponent);
