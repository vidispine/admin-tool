import React from 'react';
import { compose } from 'redux';
import { shape as api } from '@vidispine/vdt-api';

import EssenceVersionListCard from '../../components/item/EssenceVersionListCard';
import withSnackbar from '../../hoc/withSnackbar';
import { withRouterProps } from '../../hoc/withRouterProps';

class EssenceVersionList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      essenceVersionListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ itemId }) {
    const { itemId: prevItemId } = this.props;
    if (prevItemId !== itemId) {
      this.onFetch(itemId);
      document.title = `VidiCore Admin | Item | ${itemId} | Version`;
    }
  }

  onRefresh() {
    const { itemId } = this.props;
    this.onFetch(itemId);
  }

  onFetch(itemId) {
    try {
      api.listShapeEssence({ itemId })
        .then((response) => this.setState({ essenceVersionListDocument: response.data }))
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
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { essenceVersionListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={essenceVersionListDocument}
            codeModal="EssenceVersionListDocument"
            onRefresh={this.onRefresh}
            title="Version"
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {essenceVersionListDocument && (
          <EssenceVersionListCard
            essenceVersionListDocument={essenceVersionListDocument}
            linkTo={(versionId) => `/item/${itemId}/version/${versionId}/`}
          />
        )}
      </>
    );
  }
}

export default compose(withSnackbar, withRouterProps)(EssenceVersionList);
