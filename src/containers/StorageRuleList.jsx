import { PureComponent } from 'react';

import { storagerule as api } from '@vidispine/vdt-api';

import StorageRuleDialog from '../components/storagerule/StorageRuleDialog';
import StorageRuleListCard from '../components/storagerule/StorageRuleListCard';
import StorageRuleListTitle from '../components/storagerule/StorageRuleListTitle';
import withSnackbar from '../hoc/withSnackbar';

const STORAGERULE_DIALOG = 'STORAGERULE_DIALOG';

class StorageRuleList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      storageRulesDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | Storage Rule';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api
        .listStorageRule()
        .then((response) => this.setState({ storageRulesDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Storage Rule List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { storageRulesDocument } = this.state;
    return (
      <>
        <StorageRuleListTitle
          onRefresh={this.onRefresh}
          code={storageRulesDocument}
          codeModal="StorageRulesDocument"
          createModal={STORAGERULE_DIALOG}
        />
        {storageRulesDocument && (
          <StorageRuleListCard
            onRefresh={this.onRefresh}
            storageRulesDocument={storageRulesDocument}
          />
        )}
        <StorageRuleDialog dialogName={STORAGERULE_DIALOG} onSuccess={this.onRefresh} />
      </>
    );
  }
}

export default withSnackbar(StorageRuleList);
