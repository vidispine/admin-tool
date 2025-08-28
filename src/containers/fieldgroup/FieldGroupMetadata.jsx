import { PureComponent } from 'react';

import { fieldgroup as MetadataFieldGroupApi } from '@vidispine/vdt-api';

import SimpleMetadataCard from '../../components/ui/SimpleMetadataCard';
import withSnackbar from '../../hoc/withSnackbar';

class FieldGroupMetadata extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      simpleMetadataDocument: undefined,
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
      MetadataFieldGroupApi.getSimpleMetadata({ groupName }).then((response) =>
        this.setState({ simpleMetadataDocument: response.data }),
      );
    } catch (error) {
      const messageContent = 'Error Getting Field Group';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { groupName, titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
    const { simpleMetadataDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={simpleMetadataDocument}
            codeModal="SimpleMetadataDocument"
            breadcrumbList={['Metadata']}
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && <TabComponent />}
        {simpleMetadataDocument && (
          <SimpleMetadataCard
            simpleMetadataDocument={simpleMetadataDocument}
            onSuccess={this.onRefresh}
            entityType="metadata-field/field-group"
            entityId={groupName}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(FieldGroupMetadata);
