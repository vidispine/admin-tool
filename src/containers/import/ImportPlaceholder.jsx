import { useEffect } from 'react';

import { compose } from 'redux';

import ImportPlaceholderWizard, {
  EDIT_IMPORTPLACEHOLDER_FORM,
} from '../../components/import/ImportPlaceholderWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportPlaceholder({ destroyForm, history, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Placeholder';

    return () => {
      destroyForm(EDIT_IMPORTPLACEHOLDER_FORM);
    };
  }, [destroyForm]);

  const onSuccess = (response) => {
    history.push(`/item/${response.data.id}`);
  };

  return <ImportPlaceholderWizard onSuccess={onSuccess} {...props} />;
}

export default compose(withRouterProps, withFormActions)(ImportPlaceholder);
