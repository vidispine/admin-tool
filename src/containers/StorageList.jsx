import { PureComponent } from 'react';

import { compose } from 'redux';

import StorageDialog from '../components/storage/StorageDialog';
import StorageListCard from '../components/storage/StorageListCard';
import StorageListParams from '../components/storage/StorageListParams';
import StorageListTitle from '../components/storage/StorageListTitle';
import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';
import withUI from '../hoc/withUI';

const STORAGE_CREATE_MODAL = 'STORAGE_CREATE_MODAL';
const STORAGE_LIST_PARAMS_FORM = 'STORAGE_LIST_PARAMS_FORM';

class StorageList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      storageListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Storage';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(STORAGE_LIST_PARAMS_FORM);
  }

  onSuccess(response) {
    this.setState({ storageListDocument: response?.data });
  }

  render() {
    const { history } = this.props;
    const { storageListDocument } = this.state;
    return (
      <>
        <StorageListTitle
          onRefresh={this.onRefresh}
          code={storageListDocument}
          codeModal="storageListDocument"
          createModal={STORAGE_CREATE_MODAL}
        />
        <StorageListParams form={STORAGE_LIST_PARAMS_FORM} onSuccess={this.onSuccess} />

        {storageListDocument && <StorageListCard storageListDocument={storageListDocument} />}
        <StorageDialog
          dialogName={STORAGE_CREATE_MODAL}
          onSuccess={(response) => history.push(`/storage/${response.data.id}`)}
        />
      </>
    );
  }
}

export default compose(
  withUI,
  withFormActions,
  withFormSelectors,
)(StorageList, STORAGE_LIST_PARAMS_FORM);
