import { PureComponent } from 'react';

import { metadatafield as MetadataFieldApi } from '@vidispine/vdt-api';

import MetadataFieldValuesParams from '../../components/metadatafield/MetadataFieldValuesParams';
import SimpleMetadataCard from '../../components/ui/SimpleMetadataCard';
import withSnackbar from '../../hoc/withSnackbar';

class MetadataFieldValues extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      simpleMetadataDocument: undefined,
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
      MetadataFieldApi.getMetadataFieldValues({ fieldName }).then((response) =>
        this.setState({ simpleMetadataDocument: response.data }),
      );
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { fieldName, titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
    const { simpleMetadataDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={simpleMetadataDocument}
            codeModal="SimpleMetadataDocument"
            breadcrumbList={['Values']}
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && <TabComponent />}
        <MetadataFieldValuesParams
          fieldName={fieldName}
          onSuccess={(response) => this.setState({ simpleMetadataDocument: response.data })}
        />
        {simpleMetadataDocument && (
          <SimpleMetadataCard
            simpleMetadataDocument={simpleMetadataDocument}
            onRefresh={this.onRefresh}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(MetadataFieldValues);
