import { PureComponent } from 'react';
import { compose } from 'redux';
import { shape as api } from '@vidispine/vdt-api';

import EssenceVersionCard from '../../components/item/EssenceVersionCard';
import withSnackbar from '../../hoc/withSnackbar';
import { withRouterProps } from '../../hoc/withRouterProps';
import routes from '../../const/routes';

class EssenceVersion extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      essenceVersionDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ itemId, versionId }) {
    const { itemId: prevItemId, versionId: prevVersionId } = this.props;
    if (prevItemId !== itemId || prevVersionId !== versionId) {
      this.onFetch(itemId);
      document.title = `VidiCore Admin | Item | ${itemId} | Version`;
    }
  }

  onRefresh() {
    const { itemId, versionId } = this.props;
    this.onFetch({ itemId, versionId });
  }

  onFetch({ itemId, versionId }) {
    try {
      api.getShapeEssence({ itemId, versionId })
        .then((response) => this.setState({ essenceVersionDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Item';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      itemId,
      versionId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { essenceVersionDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={essenceVersionDocument}
            codeModal="EssenceVersionDocument"
            onRefresh={this.onRefresh}
            versionId={versionId}
            breadcrumbList={[{ title: 'Version', to: routes.itemVersionList({ itemId }) }, { title: versionId }]}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {essenceVersionDocument && (
          <EssenceVersionCard
            essenceVersionDocument={essenceVersionDocument}
            linkTo={(shapeId) => `/item/${itemId}/shape/${shapeId}/`}
          />
        )}
      </>
    );
  }
}

export default compose(withSnackbar, withRouterProps)(EssenceVersion);
