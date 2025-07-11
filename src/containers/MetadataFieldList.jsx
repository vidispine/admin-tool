import { PureComponent } from 'react';

import { metadatafield as api } from '@vidispine/vdt-api';

import MetadataFieldDialog from '../components/metadatafield/MetadataFieldDialog';
import MetadataFieldListCard from '../components/metadatafield/MetadataFieldListCard';
import MetadataFieldListTitle from '../components/metadatafield/MetadataFieldListTitle';
import withSnackbar from '../hoc/withSnackbar';

const METADATAFIELDLIST_CREATE_MODAL = 'METADATAFIELDLIST_CREATE_MODAL';

class MetadataFieldList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      metadataFieldListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | Metadata Field';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api
        .listMetadataField()
        .then((response) => this.setState({ metadataFieldListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Metadata Field List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { metadataFieldListDocument } = this.state;
    return (
      <>
        <MetadataFieldListTitle
          createModal={METADATAFIELDLIST_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={metadataFieldListDocument}
          codeModal="MetadataFieldListDocument"
        />
        {metadataFieldListDocument && (
          <MetadataFieldListCard
            metadataFieldListDocument={metadataFieldListDocument}
            onRefresh={this.onRefresh}
          />
        )}
        <MetadataFieldDialog dialogName={METADATAFIELDLIST_CREATE_MODAL} />
      </>
    );
  }
}

export default withSnackbar(MetadataFieldList);
