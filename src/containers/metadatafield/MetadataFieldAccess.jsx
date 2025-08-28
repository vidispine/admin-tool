import { PureComponent } from 'react';

import { compose } from 'redux';

import { metadatafield as MetadataFieldApi } from '@vidispine/vdt-api';

import MetadataFieldAccessControlListCard from '../../components/metadatafield/MetadataFieldAccessControlListCard';
import MetadataFieldAccessControlRemove, {
  REMOVE_METADATAFIELD_ACCESS_DIALOG,
} from '../../components/metadatafield/MetadataFieldAccessControlRemove';
import withDialogProps from '../../hoc/withDialogProps';
import withSnackbar from '../../hoc/withSnackbar';

class MetadataFieldAccess extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      metadataFieldAccessControlListDocument: undefined,
    };
    const { onOpen } = props;
    this.onOpenRemove = onOpen ? onOpen(REMOVE_METADATAFIELD_ACCESS_DIALOG) : null;
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
      MetadataFieldApi.listMetadataFieldAccess({ fieldName }).then((response) =>
        this.setState({ metadataFieldAccessControlListDocument: response.data }),
      );
    } catch (error) {
      const messageContent = 'Error Getting Metadata Field';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      fieldName,
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
        <MetadataFieldAccessControlRemove
          dialogName={REMOVE_METADATAFIELD_ACCESS_DIALOG}
          onSuccess={this.onRefresh}
          fieldName={fieldName}
          {...dialogProps}
        />
      </>
    );
  }
}

export default compose(withSnackbar, withDialogProps)(MetadataFieldAccess);
