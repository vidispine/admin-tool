import { PureComponent } from 'react';

import { configuration as ConfigurationApi } from '@vidispine/vdt-api';

import DatabasePurgingCard from '../../components/configuration/databasepurging/DatabasePurgingCard';
import DatabasePurgingRemove from '../../components/configuration/databasepurging/DatabasePurgingRemove';
import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

const DATABASEPURGING_REMOVE_DIALOG = 'DATABASEPURGING_REMOVE_DIALOG';

class DatabasePurging extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      databasePurgingConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | Database Purging';
  }

  onRefresh() {
    try {
      ConfigurationApi.getDatabasePurgingConfiguration()
        .then((response) => this.setState({ databasePurgingConfigurationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Database Purging Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { databasePurgingConfigurationDocument } = this.state;
    return (
      <>
        <TitleHeader
          parentTitle="Configuration"
          parentTo="/configuration/"
          title="Database Purging"
          helpTo="/ref/property.html#database-purging-configuration"
          onRefresh={this.onRefresh}
          code={databasePurgingConfigurationDocument}
          codeModal="databasePurgingConfigurationDocument"
          removeModal={DATABASEPURGING_REMOVE_DIALOG}
        />
        {databasePurgingConfigurationDocument && (
          <DatabasePurgingCard
            databasePurgingConfigurationDocument={databasePurgingConfigurationDocument}
            onSuccess={this.onRefresh}
          />
        )}
        <DatabasePurgingRemove
          dialogName={DATABASEPURGING_REMOVE_DIALOG}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(DatabasePurging);
