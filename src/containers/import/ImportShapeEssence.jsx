import { useEffect } from 'react';

import { compose } from 'redux';

import ImportShapeEssenceWizard, {
  EDIT_IMPORTSHAPEESSENCE_FORM,
} from '../../components/import/ImportShapeEssenceWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

function ImportShapeEssence({ destroyForm, history, ...props }) {
  useEffect(() => {
    document.title = 'VidiCore Admin | Import | Essence';

    return () => {
      destroyForm(EDIT_IMPORTSHAPEESSENCE_FORM);
    };
  }, [destroyForm]);

  const onSuccess = (response) => {
    history.push(`/job/${response.data.jobId}`);
  };

  return <ImportShapeEssenceWizard onSuccess={onSuccess} {...props} />;
}

export default compose(withRouterProps, withFormActions)(ImportShapeEssence);
