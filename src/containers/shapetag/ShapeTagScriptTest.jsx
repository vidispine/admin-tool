import { PureComponent } from 'react';

import { compose } from 'redux';

import { shapetag as ShapeTagApi } from '@vidispine/vdt-api';

import ShapeTagScriptTestCard from '../../components/shapetag/ShapeTagScriptTestCard';
import ShapeTagScriptTestParams from '../../components/shapetag/ShapeTagScriptTestParams';
import routes from '../../const/routes';
import withUI from '../../hoc/withUI';

const SHAPETAG_TEST_PARAMS_FORM = 'SHAPETAG_TEST_PARAMS_FORM';

class ShapeTagScriptTest extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onScriptUpdateSuccess = this.onScriptUpdateSuccess.bind(this);
    this.onTestSuccess = this.onTestSuccess.bind(this);
    this.state = {
      shapeTagScript: undefined,
      transcodePresetDocument: undefined,
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

  onTestSuccess(response) {
    const { data: transcodePresetDocument } = response;
    this.setState({ transcodePresetDocument });
  }

  onScriptUpdateSuccess(response, dispatch, props) {
    const shapeTagScript = props?.values?.shapeTagScript;
    if (shapeTagScript) this.setState({ shapeTagScript });
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
    const { shapeTagScript, transcodePresetDocument, hasLoaded } = this.state;
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
              { title: 'Script Test' },
            ]}
          />
        )}
        {TabComponent && <TabComponent />}
        <ShapeTagScriptTestParams
          form={SHAPETAG_TEST_PARAMS_FORM}
          tagName={tagName}
          onSuccess={this.onTestSuccess}
        />
        {hasLoaded && (
          <ShapeTagScriptTestCard
            tagName={tagName}
            shapeTagScript={shapeTagScript}
            transcodePresetDocument={transcodePresetDocument}
            onSuccess={this.onScriptUpdateSuccess}
          />
        )}
      </>
    );
  }
}

export default compose(withUI)(ShapeTagScriptTest);
