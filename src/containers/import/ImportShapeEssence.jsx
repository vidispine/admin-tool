import React from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import ImportShapeEssenceWizard, {
  EDIT_IMPORTSHAPEESSENCE_FORM,
} from '../../components/import/ImportShapeEssenceWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportShapeEssence extends React.PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | Essence';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTSHAPEESSENCE_FORM);
  }

  render() {
    const { history, ...props } = this.props;
    return (
      <ImportShapeEssenceWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportShapeEssence);
