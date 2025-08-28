import { PureComponent } from 'react';

import { metadatafield as api } from '@vidispine/vdt-api';

import MetadataFieldAllowedValuesCard from '../../components/metadatafield/MetadataFieldAllowedValuesCard';
import MetadataFieldAllowedValuesParams from '../../components/metadatafield/MetadataFieldAllowedValuesParams';
import withSnackbar from '../../hoc/withSnackbar';

class MetadataFieldAllowedValues extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      constraintValueListDocument: undefined,
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
        .getMetadataFieldAllowedValues({ fieldName })
        .then((response) => this.setState({ constraintValueListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { fieldName, titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
    const { constraintValueListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={constraintValueListDocument}
            codeModal="ConstraintValueListDocument"
            breadcrumbList={['Allowed Values']}
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && <TabComponent />}
        <MetadataFieldAllowedValuesParams
          fieldName={fieldName}
          onSuccess={(response) => this.setState({ constraintValueListDocument: response.data })}
        />
        {constraintValueListDocument && (
          <MetadataFieldAllowedValuesCard
            constraintValueListDocument={constraintValueListDocument}
            onRefresh={this.onRefresh}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(MetadataFieldAllowedValues);
