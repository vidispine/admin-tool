import React from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import ImportSidecarWizard, {
  EDIT_IMPORTSIDECAR_FORM,
} from '../../components/import/ImportSidecarWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportSidecar extends React.PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | Sidecar';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTSIDECAR_FORM);
  }

  render() {
    const { history, location, ...props } = this.props;
    const query = new URLSearchParams(location.search);
    const fileId = query.get('fileId');
    const itemId = query.get('itemId');
    return (
      <ImportSidecarWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        initialValues={{ itemId, queryParams: { sidecar: fileId } }}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportSidecar);
