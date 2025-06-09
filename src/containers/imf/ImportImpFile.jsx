import { PureComponent } from 'react';

import ImportImpFileWizard, { EDIT_IMPORTIMPFILE_FORM } from '../../components/imf/ImportImpFileWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportImpFile extends PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | IMF | Import File';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTIMPFILE_FORM);
  }

  render() {
    const { history, location } = this.props;
    const query = new URLSearchParams(location.search);
    const fileId = query.get('fileId');
    return (
      <ImportImpFileWizard
        initialValues={{ fileId, metadataDocument: {} }}
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
      />
    );
  }
}

export default withFormActions(ImportImpFile);
