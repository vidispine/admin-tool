import { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import ImportSidecarRawWizard, {
  EDIT_IMPORTSIDECARRAW_FORM,
} from '../../components/import/ImportSidecarRawWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportSidecarRaw extends PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | Sidecar Upload';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTSIDECARRAW_FORM);
  }

  render() {
    const { history, location, ...props } = this.props;
    const query = new URLSearchParams(location.search);
    const itemId = query.get('itemId');
    return (
      <ImportSidecarRawWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        initialValues={{ itemId, queryParams: { } }}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportSidecarRaw);
