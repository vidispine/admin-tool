import { PureComponent } from 'react';

import { metadatafield as MetadataFieldApi } from '@vidispine/vdt-api';

import AccessControlMergedList from '../../components/access/AccessControlMergedList';
import MetadataFieldMergedAccessParams from '../../components/metadatafield/MetadataFieldMergedAccessParams';
import withSnackbar from '../../hoc/withSnackbar';

class MetadataFieldMergedAccess extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      accessControlMergedDocument: undefined,
    };
  }

  componentDidMount() {
    const { fieldName, setOnRefresh } = this.props;
    if (setOnRefresh) setOnRefresh(this.onRefresh);
    document.title = `VidiCore Admin | Metadata Field | ${fieldName}`;
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ fieldName }) {
    const { fieldName: prevFieldName } = this.props;
    if (prevFieldName !== fieldName) {
      this.onFetch(fieldName);
    }
  }

  onRefresh() {
    const { fieldName } = this.props;
    this.onFetch(fieldName);
  }

  onFetch(fieldName) {
    const { openSnackBar } = this.props;
    try {
      MetadataFieldApi.getMetadataFieldMergedAccess({ fieldName }).then((response) =>
        this.setState({ accessControlMergedDocument: response.data }),
      );
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { fieldName, titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
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
          fieldName={fieldName}
          onSuccess={(response) => this.setState({ accessControlMergedDocument: response.data })}
        />
        {accessControlMergedDocument && (
          <AccessControlMergedList accessControlMergedDocument={accessControlMergedDocument} />
        )}
      </>
    );
  }
}

export default withSnackbar(MetadataFieldMergedAccess);
