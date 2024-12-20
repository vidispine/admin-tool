import React from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import ImportCollectionWizard, {
  EDIT_COLLECTION_FORM,
} from '../../components/import/ImportCollectionWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportCollection extends React.PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | Collection';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_COLLECTION_FORM);
  }

  render() {
    const { history, ...props } = this.props;
    return (
      <ImportCollectionWizard
        onSuccess={(response) => history.push(`/collection/${response.data.id}`)}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportCollection);
