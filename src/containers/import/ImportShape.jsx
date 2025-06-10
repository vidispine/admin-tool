import { useEffect } from 'react';

import { compose } from 'redux';

import ImportShapeWizard, {
  EDIT_IMPORTSHAPE_FORM,
} from '../../components/import/ImportShapeWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportShape({ destroyForm, history, location, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Shape';

    return () => {
      destroyForm(EDIT_IMPORTSHAPE_FORM);
    };
  }, [destroyForm]);

  const query = new URLSearchParams(location.search);
  const fileId = query.get('fileId');
  const itemId = query.get('itemId');

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return (
    <ImportShapeWizard
      onSuccess={onSuccess}
      initialValues={{ itemId, queryParams: { fileId } }}
      {...props}
    />
  );
}

export default compose(withRouterProps, withFormActions)(ImportShape);
