import { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import withFormActions from '../../hoc/withFormActions';
import ImportShapePlaceholderWizard, {
  EDIT_IMPORTSHAPEPLACEHOLDER_FORM,
} from '../../components/import/ImportShapePlaceholderWizard';

class ImportShapePlaceholder extends PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | Shape Placeholder';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTSHAPEPLACEHOLDER_FORM);
  }

  render() {
    const { location, history } = this.props;
    const query = new URLSearchParams(location.search);
    const itemId = query.get('itemId');
    const onSuccess = (response, dispatch, props) => {
      const shapeId = response?.data;
      const valueItemId = props?.values?.itemId;
      history.push(`/item/${valueItemId}/shape/${shapeId}/`);
    };
    return (
      <ImportShapePlaceholderWizard
        initialValues={{ itemId }}
        onSuccess={onSuccess}
        {...this.props}
      />
    );
  }
}

export default compose(
  withRouterProps,
  withFormActions,
)(ImportShapePlaceholder);
