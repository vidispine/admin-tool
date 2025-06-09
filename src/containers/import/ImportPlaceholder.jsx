import { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouterProps } from '../../hoc/withRouterProps';
import withFormActions from '../../hoc/withFormActions';
import ImportPlaceholderWizard, {
  EDIT_IMPORTPLACEHOLDER_FORM,
} from '../../components/import/ImportPlaceholderWizard';

class ImportPlaceholder extends PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | Placeholder';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTPLACEHOLDER_FORM);
  }

  render() {
    const { history, ...props } = this.props;
    return (
      <ImportPlaceholderWizard
        onSuccess={(response) => history.push(`/item/${response.data.id}`)}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportPlaceholder);
