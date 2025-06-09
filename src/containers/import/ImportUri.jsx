import { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import withFormActions from '../../hoc/withFormActions';
import ImportUriWizard, { EDIT_IMPORTURI_FORM } from '../../components/import/ImportUriWizard';

class ImportUri extends PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | URI';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTURI_FORM);
  }

  render() {
    const { history, ...props } = this.props;
    return (
      <ImportUriWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportUri);
