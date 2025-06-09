import { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import withFormActions from '../../hoc/withFormActions';
import ImportShapeWizard, {
  EDIT_IMPORTSHAPE_FORM,
} from '../../components/import/ImportShapeWizard';

class ImportShape extends PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | Shape';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTSHAPE_FORM);
  }

  render() {
    const { history, location, ...props } = this.props;
    const query = new URLSearchParams(location.search);
    const fileId = query.get('fileId');
    const itemId = query.get('itemId');
    return (
      <ImportShapeWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        initialValues={{ itemId, queryParams: { fileId } }}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportShape);
