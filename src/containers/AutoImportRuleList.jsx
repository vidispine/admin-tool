import { PureComponent } from 'react';

import { autoimport as api } from '@vidispine/vdt-api';

import AutoImportRuleDialog from '../components/autoimport/AutoImportRuleDialog';
import AutoImportRuleListCard from '../components/autoimport/AutoImportRuleListCard';
import AutoImportRuleListTitle from '../components/autoimport/AutoImportRuleListTitle';
import withSnackbar from '../hoc/withSnackbar';

const AUTOIMPORT_CREATE_MODAL = 'AUTOIMPORT_CREATE_MODAL';

class AutoImportRuleList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      autoImportRuleListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Auto Import';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api
        .listAutoImport()
        .then((response) => this.setState({ autoImportRuleListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Auto Import Rules';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { autoImportRuleListDocument } = this.state;
    return (
      <>
        <AutoImportRuleListTitle
          onRefresh={this.onRefresh}
          code={autoImportRuleListDocument}
          codeModal="AutoImportRuleListDocument"
          createModal={AUTOIMPORT_CREATE_MODAL}
        />
        {autoImportRuleListDocument && (
          <AutoImportRuleListCard autoImportRuleListDocument={autoImportRuleListDocument} />
        )}
        <AutoImportRuleDialog dialogName={AUTOIMPORT_CREATE_MODAL} />
      </>
    );
  }
}

export default withSnackbar(AutoImportRuleList);
