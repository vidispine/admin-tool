import { PureComponent } from 'react';

import { configuration as api } from '@vidispine/vdt-api';

import PathAliasCard from '../../components/configuration/pathalias/PathAliasCard';
import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

class PathAlias extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      pathAliasConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Path Alias';
    this.onRefresh();
  }

  onRefresh() {
    try {
      api
        .getPathAliasConfiguration()
        .then((response) => this.setState({ pathAliasConfigurationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Path Alias Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { pathAliasConfigurationDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Path Alias"
          parentTitle="Configuration"
          parentTo="/configuration/"
          helpTo="/ref/property.html#path-alias-configuration"
          onRefresh={this.onRefresh}
          code={pathAliasConfigurationDocument}
          codeModal="PathAliasConfigurationDocument"
        />
        {pathAliasConfigurationDocument && (
          <PathAliasCard
            pathAliasConfigurationDocument={pathAliasConfigurationDocument}
            onSuccess={this.onRefresh}
          />
        )}
      </>
    );
  }
}

export default withSnackbar(PathAlias);
