import React from 'react';
import { compose } from 'redux';
import ImportComponentWizard, { EDIT_IMPORTCOMPONENT_FORM } from '../../components/import/ImportComponentWizard';
import withFormActions from '../../hoc/withFormActions';
import { withRouterProps } from '../../hoc/withRouterProps';

class ImportComponent extends React.PureComponent {
  componentDidMount() {
    document.title = 'VidiCore Admin | Import | Component';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTCOMPONENT_FORM);
  }

  render() {
    const { history, location, ...props } = this.props;
    const query = new URLSearchParams(location.search);
    const fileId = query.get('fileId');
    const itemId = query.get('itemId');
    return (
      <ImportComponentWizard
        onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        initialValues={{ itemId, queryParams: { fileId } }}
        {...props}
      />
    );
  }
}

export default compose(withRouterProps, withFormActions)(ImportComponent);
