import { PureComponent } from 'react';

import { metadatafield as api } from '@vidispine/vdt-api';

import MetadataFieldCard from '../../components/metadatafield/MetadataFieldCard';
import withSnackbar from '../../hoc/withSnackbar';

class MetadataFieldOverview extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      metadataFieldDocument: undefined,
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
      api
        .getMetadataField({ fieldName, queryParams: { includeValues: false } })
        .then((response) => this.setState({ metadataFieldDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
    const { metadataFieldDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataFieldDocument}
            codeModal="MetadataFieldDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && <TabComponent />}
        {metadataFieldDocument && (
          <MetadataFieldCard
            metadataFieldDocument={metadataFieldDocument}
            onRefresh={this.onRefresh}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(MetadataFieldOverview);
