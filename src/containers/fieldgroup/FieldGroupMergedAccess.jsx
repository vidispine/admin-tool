import { PureComponent } from 'react';

import { fieldgroup as MetadataFieldGroupApi } from '@vidispine/vdt-api';

import AccessControlMergedList from '../../components/access/AccessControlMergedList';
import MetadataFieldMergedAccessParams from '../../components/metadatafield/MetadataFieldMergedAccessParams';
import * as formActions from '../../formactions/fieldgroup';
import withSnackbar from '../../hoc/withSnackbar';

class FieldGroupMergedAccess extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      accessControlMergedDocument: undefined,
    };
  }

  componentDidMount() {
    const { groupName } = this.props;
    document.title = `VidiCore Admin | Field Group | ${groupName}`;
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
      MetadataFieldGroupApi.getFieldGroupMergedAccess({ groupName }).then((response) =>
        this.setState({ accessControlMergedDocument: response.data }),
      );
    } catch (error) {
      const messageContent = 'Error Getting Field Group';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { groupName, titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
    const { accessControlMergedDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={accessControlMergedDocument}
            codeModal="AccessControlMergedDocument"
            breadcrumbList={['Merged Access']}
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && <TabComponent />}
        <MetadataFieldMergedAccessParams
          groupName={groupName}
          onSubmit={formActions.onGetMergedAccess}
          onSuccess={(response) => this.setState({ accessControlMergedDocument: response.data })}
        />
        {accessControlMergedDocument && (
          <AccessControlMergedList accessControlMergedDocument={accessControlMergedDocument} />
        )}
      </>
    );
  }
}

export default withSnackbar(FieldGroupMergedAccess);
