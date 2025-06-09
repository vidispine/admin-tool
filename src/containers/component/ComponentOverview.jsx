import { PureComponent } from 'react';
import { component as ComponentApi } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';
import ComponentOverviewComponent from '../../components/component/ComponentOverview';

class ComponentOverview extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      componentDocument: undefined,
    };
  }

  componentDidMount() {
    const { setOnRefresh } = this.props;
    if (setOnRefresh) setOnRefresh(this.onRefresh);
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ shapeId, itemId, componentId }) {
    const { componentId: prevComponentId } = this.props;
    if (prevComponentId !== componentId) {
      this.onFetch(itemId, shapeId, componentId);
      document.title = `VidiCore Admin | Component | ${componentId}`;
    }
  }

  onRefresh() {
    const { itemId, shapeId, componentId } = this.props;
    this.onFetch(itemId, shapeId, componentId);
  }

  onFetch(itemId, shapeId, componentId) {
    try {
      ComponentApi.getComponent({
        itemId,
        shapeId,
        componentId,
        queryParams: { full: true },
      })
        .then((response) => this.setState({ componentDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Component';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onSuccess(response) {
    const componentDocument = response.data;
    this.setState({ componentDocument });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      shapeId,
      itemId,
      componentId,
    } = this.props;
    const { componentDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={componentDocument}
            codeModal="ComponentDocument"
            onRefresh={this.onRefresh}
            breadcrumbList={['Overview']}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        {componentDocument && (
          <>
            <ComponentOverviewComponent
              componentDocument={componentDocument}
              shapeId={shapeId}
              itemId={itemId}
              componentId={componentId}
              onRefresh={this.onRefresh}
            />
          </>
        )}
      </>
    );
  }
}

export default withSnackbar(ComponentOverview);
