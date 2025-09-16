import { PureComponent } from 'react';

import { compose } from 'redux';

import { fieldgroup as MetadataFieldGroupApi } from '@vidispine/vdt-api';

import FieldGroupAccessControlRemove, {
  REMOVE_FIELDGROUP_ACCESS_DIALOG,
} from '../../components/fieldgroup/FieldGroupAccessControlRemove';
import MetadataFieldAccessControlListCard from '../../components/metadatafield/MetadataFieldAccessControlListCard';
import withDialogProps from '../../hoc/withDialogProps';
import withSnackbar from '../../hoc/withSnackbar';

class FieldGroupAccess extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      metadataFieldAccessControlListDocument: undefined,
    };
    const { onOpen } = props;
    this.onOpenRemove = onOpen ? onOpen(REMOVE_FIELDGROUP_ACCESS_DIALOG) : null;
  }

  componentDidMount() {
    const { groupName, setOnRefresh } = this.props;
    if (setOnRefresh) setOnRefresh(this.onRefresh);
    document.title = `VidiCore Admin | Metadata Field Group | ${groupName}`;
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ groupName }) {
    const { groupName: prevGroupName } = this.props;
    if (prevGroupName !== groupName) {
      this.onFetch(groupName);
    }
  }

  onRefresh() {
    const { groupName } = this.props;
    this.onFetch(groupName);
  }

  onFetch(groupName) {
    const { openSnackBar } = this.props;
    try {
      MetadataFieldGroupApi.listFieldGroupAccess({ groupName }).then((response) =>
        this.setState({ metadataFieldAccessControlListDocument: response.data }),
      );
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field Group';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      groupName,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      dialogProps = {},
    } = this.props;
    const { metadataFieldAccessControlListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataFieldAccessControlListDocument}
            codeModal="MetadataFieldAccessControlListDocument"
            breadcrumbList={['Access']}
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && <TabComponent />}
        {metadataFieldAccessControlListDocument && (
          <MetadataFieldAccessControlListCard
            metadataFieldAccessControlListDocument={metadataFieldAccessControlListDocument}
            onOpenRemove={this.onOpenRemove}
          />
        )}
        <FieldGroupAccessControlRemove
          dialogName={REMOVE_FIELDGROUP_ACCESS_DIALOG}
          onSuccess={this.onRefresh}
          groupName={groupName}
          {...dialogProps}
        />
      </>
    );
  }
}

export default compose(withSnackbar, withDialogProps)(FieldGroupAccess);
