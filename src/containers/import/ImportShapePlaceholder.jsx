import { useEffect } from 'react';

import { compose } from 'redux';

import ImportShapePlaceholderWizard, {
  EDIT_IMPORTSHAPEPLACEHOLDER_FORM,
} from '../../components/import/ImportShapePlaceholderWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportShapePlaceholder({ destroyForm, location, history, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Shape Placeholder';

    return () => {
      destroyForm(EDIT_IMPORTSHAPEPLACEHOLDER_FORM);
    };
  }, [destroyForm]);

  const query = new URLSearchParams(location.search);
  const itemId = query.get('itemId');

  const onSuccess = (response, dispatch, { values }) => {
    const shapeId = response?.data;
    const valueItemId = values?.itemId;
    history.push(`/item/${valueItemId}/shape/${shapeId}/`);
  };

  return (
    <ImportShapePlaceholderWizard initialValues={{ itemId }} onSuccess={onSuccess} {...props} />
  );
}

export default compose(withRouterProps, withFormActions)(ImportShapePlaceholder);
