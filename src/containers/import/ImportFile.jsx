import React from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import withFormActions from '../../hoc/withFormActions';
import ImportFileWizard, {
  EDIT_IMPORTFILE_FORM,
} from '../../components/import/ImportFileWizard';

class ImportFile extends React.PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | File';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTFILE_FORM);
  }

  render() {
    const { history, location, ...props } = this.props;
    const query = new URLSearchParams(location.search);
    const fileId = query.get('fileId');
    return (
      <ImportFileWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        initialValues={{ fileId, metadataDocument: {} }}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportFile);
