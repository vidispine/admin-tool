import { PureComponent } from 'react';

import { shapetag as ShapeTagApi } from '@vidispine/vdt-api';

import ShapeTagScriptCard from '../../components/shapetag/ShapeTagScriptCard';
import routes from '../../const/routes';
import withUI from '../../hoc/withUI';

class ShapeTagScript extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      shapeTagScript: undefined,
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
      ShapeTagApi.getShapeTagScript({ tagName })
        .then((response) => this.setState({ shapeTagScript: response.data, hasLoaded: true }))
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
    const { shapeTagScript, hasLoaded } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={shapeTagScript}
            codeModal="script"
            onRefresh={this.onRefresh}
            breadcrumbList={[
              { title: 'Shape Tag', to: routes.shapeTagList() },
              { title: tagName, to: routes.shapeTag({ tagName }) },
              { title: 'Script' },
            ]}
          />
        )}
        {TabComponent && <TabComponent />}
        {hasLoaded && (
          <ShapeTagScriptCard
            onRefresh={this.onRefresh}
            tagName={tagName}
            shapeTagScript={shapeTagScript}
          />
        )}
      </>
    );
  }
}

export default withUI(ShapeTagScript);
