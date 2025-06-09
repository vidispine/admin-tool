import { PureComponent } from 'react';

import { configuration as api } from '@vidispine/vdt-api';
import BulkyMetadataCard from '../../components/configuration/bulkymetadata/BulkyMetadataCard';
import BulkyMetadataRemove from '../../components/configuration/bulkymetadata/BulkyMetadataRemove';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

const BULKYMETADATACONFIGURATION_REMOVE_MODAL = 'BULKYMETADATACONFIGURATION_REMOVE_MODAL';

class BulkyMetadata extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      bulkyMetadataConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | Bulky Metadata';
  }

  onRefresh() {
    try {
      api.getBulkyMetadataConfiguration()
        .then((response) => this.setState({ bulkyMetadataConfigurationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Bulky Metadata Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { bulkyMetadataConfigurationDocument } = this.state;
    return (
      <>
        <TitleHeader
          parentTitle="Configuration"
          parentTo="/configuration/"
          title="Bulky Metadata"
          helpTo="/ref/property.html#bulky-metadata-storage-configuration"
          onRefresh={this.onRefresh}
          code={bulkyMetadataConfigurationDocument}
          codeModal="BulkyMetadataConfigurationDocument"
          removeModal={BULKYMETADATACONFIGURATION_REMOVE_MODAL}

        />
        { bulkyMetadataConfigurationDocument && (
          <BulkyMetadataCard
            bulkyMetadataConfigurationDocument={bulkyMetadataConfigurationDocument}
            onSuccess={this.onRefresh}
          />
        )}
        <BulkyMetadataRemove
          dialogName={BULKYMETADATACONFIGURATION_REMOVE_MODAL}
          onSuccess={this.onRefresh}
        />

      </>
    );
  }
}

export default withSnackbar(BulkyMetadata);
