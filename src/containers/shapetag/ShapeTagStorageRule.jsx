import { PureComponent } from 'react';

import { storagerule as StorageRuleApi } from '@vidispine/vdt-api';

import StorageRuleTagDialog from '../../components/storagerule/StorageRuleTagDialog';
import StorageRuleTagEditor from '../../components/storagerule/StorageRuleTagEditor';
import routes from '../../const/routes';
import withUI from '../../hoc/withUI';

const SHAPETAG_STORAGERULE_DIALOG = 'SHAPETAG_STORAGERULE_DIALOG';

class ShapeTagStorageRule extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      storageRuleDocument: undefined,
      hasLoaded: false,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { tagName } = this.props;
    this.onFetch(tagName);
  }

  onFetch(tagName) {
    try {
      StorageRuleApi.getStorageRuleShapeTag({ tagName })
        .then((response) => this.setState({ storageRuleDocument: response.data, hasLoaded: true }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.setState({ hasLoaded: true });
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Shape Tag';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { tagName, titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
    const { storageRuleDocument, hasLoaded } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={storageRuleDocument}
            codeModal="storageRuleDocument"
            onRefresh={this.onRefresh}
            createModal={SHAPETAG_STORAGERULE_DIALOG}
            breadcrumbList={[
              { title: 'Shape Tag', to: routes.shapeTagList() },
              { title: tagName, to: routes.shapeTag({ tagName }) },
              { title: 'Storage Rule' },
            ]}
          />
        )}
        {TabComponent && <TabComponent />}
        {hasLoaded && storageRuleDocument && (
          <StorageRuleTagEditor
            onRefresh={this.onRefresh}
            storageRuleDocument={storageRuleDocument}
            tagName={tagName}
          />
        )}
        <StorageRuleTagDialog
          dialogName={SHAPETAG_STORAGERULE_DIALOG}
          onSuccess={this.onRefresh}
          tagName={tagName}
        />
      </>
    );
  }
}

export default withUI(ShapeTagStorageRule);
