import { useEffect } from 'react';

import { compose } from 'redux';

import ImportCollectionWizard, {
  EDIT_COLLECTION_FORM,
} from '../../components/import/ImportCollectionWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportCollection({ destroyForm, history, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Collection';

    return () => {
      destroyForm(EDIT_COLLECTION_FORM);
    };
  }, [destroyForm]);

  const onSuccess = (response) => {
    history.push(`/collection/${response.data.id}`);
  };

  return <ImportCollectionWizard onSuccess={onSuccess} {...props} />;
}

export default compose(withRouterProps, withFormActions)(ImportCollection);
