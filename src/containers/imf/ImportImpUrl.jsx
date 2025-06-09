import { PureComponent } from 'react';

import ImportImpUrlWizard, { EDIT_IMPORTIMPURL_FORM } from '../../components/imf/ImportImpUrlWizard';
import withFormActions from '../../hoc/withFormActions';

class ImportImpUrl extends PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | IMF | Import URL';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTIMPURL_FORM);
  }

  render() {
    const { history } = this.props;
    return (
      <ImportImpUrlWizard
        initialValues={{ metadataDocument: {} }}
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
      />
    );
  }
}

export default withFormActions(ImportImpUrl);
