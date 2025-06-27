import { PureComponent } from 'react';

import { autoimport as api } from '@vidispine/vdt-api';

import AutoImportRuleCard from '../components/autoimport/AutoImportRuleCard';
import AutoImportRuleDialog from '../components/autoimport/AutoImportRuleDialog';
import AutoImportRuleDisable from '../components/autoimport/AutoImportRuleDisable';
import AutoImportRuleEnable from '../components/autoimport/AutoImportRuleEnable';
import AutoImportRuleRemove from '../components/autoimport/AutoImportRuleRemove';
import TitleHeader from '../components/ui/TitleHeader';
import withSnackbar from '../hoc/withSnackbar';

const AUTOIMPORTRULE_REMOVE_MODAL = 'AUTOIMPORTRULE_REMOVE_MODAL';
const AUTOIMPORT_CREATE_MODAL = 'AUTOIMPORT_CREATE_MODAL';
const AUTOIMPORTRULE_DISABLE_DIALOG = 'AUTOIMPORTRULE_DISABLE_DIALOG';
const AUTOIMPORTRULE_ENABLE_DIALOG = 'AUTOIMPORTRULE_ENABLE_DIALOG';

class AutoImportRule extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      autoImportRuleDocument: undefined,
    };
  }

  componentDidMount() {
    const { storageId } = this.props;
    document.title = `VidiCore Admin | Auto Import Rule | ${storageId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, storageId } = this.props;
    try {
      api
        .getAutoImport({ storageId })
        .then((response) => this.setState({ autoImportRuleDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Auto Import Rule';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { storageId } = this.props;
    const { autoImportRuleDocument } = this.state;
    return (
      <>
        <TitleHeader
          title={storageId}
          parentTitle="Auto Import Rule"
          parentTo="/auto-import/"
          helpTo="/storage/auto-import.html"
          removeModal={AUTOIMPORTRULE_REMOVE_MODAL}
          onRefresh={this.onRefresh}
          storageId={storageId}
          code={autoImportRuleDocument}
          codeModal="AutoImportRuleDocument"
          createModal={AUTOIMPORT_CREATE_MODAL}
          menuList={[
            {
              label: 'Create Rule',
              modalName: AUTOIMPORT_CREATE_MODAL,
            },
            {
              label: 'Enable Rule',
              modalName: AUTOIMPORTRULE_ENABLE_DIALOG,
            },
            {
              label: 'Disable Rule',
              modalName: AUTOIMPORTRULE_DISABLE_DIALOG,
              color: 'secondary',
            },
            {
              label: 'Delete Rule',
              modalName: AUTOIMPORTRULE_REMOVE_MODAL,
              color: 'secondary',
            },
          ]}
        />
        {autoImportRuleDocument && (
          <AutoImportRuleCard
            onRefresh={this.onRefresh}
            storageId={storageId}
            autoImportRuleDocument={autoImportRuleDocument}
          />
        )}
        <AutoImportRuleRemove dialogName={AUTOIMPORTRULE_REMOVE_MODAL} storageId={storageId} />
        <AutoImportRuleDialog dialogName={AUTOIMPORT_CREATE_MODAL} storageId={storageId} />
        <AutoImportRuleDisable
          dialogName={AUTOIMPORTRULE_DISABLE_DIALOG}
          storageId={storageId}
          onSuccess={this.onRefresh}
        />
        <AutoImportRuleEnable
          dialogName={AUTOIMPORTRULE_ENABLE_DIALOG}
          storageId={storageId}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(AutoImportRule);
