import { PureComponent } from 'react';

import { shapetag as ShapeTagApi } from '@vidispine/vdt-api';

import ShapeTagCard from '../../components/shapetag/ShapeTagCard';
import ShapeTagRemove from '../../components/shapetag/ShapeTagRemove';
import withUI from '../../hoc/withUI';

const SHAPETAG_REMOVE_MODAL = 'SHAPETAG_REMOVE_MODAL';

class ShapeTagShapeTag extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      transcodePresetDocument: undefined,
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
      ShapeTagApi.getShapeTag({ tagName })
        .then((response) => this.setState({ transcodePresetDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Shape Tag';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      tagName,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      history,
    } = this.props;
    const { transcodePresetDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={transcodePresetDocument}
            codeModal="TranscodePresetDocument"
            onRefresh={this.onRefresh}
            removeModal={SHAPETAG_REMOVE_MODAL}
            menuList={[
              {
                label: 'Delete Shape Tag',
                modalName: SHAPETAG_REMOVE_MODAL,
                color: 'secondary',
              },
            ]}
          />
        )}
        {TabComponent && <TabComponent />}
        {transcodePresetDocument && (
          <ShapeTagCard
            onRefresh={this.onRefresh}
            tagName={tagName}
            transcodePresetDocument={transcodePresetDocument}
          />
        )}
        <ShapeTagRemove
          dialogName={SHAPETAG_REMOVE_MODAL}
          onSuccess={() => history.push('/shape-tag/')}
          tagName={tagName}
        />
      </>
    );
  }
}

export default withUI(ShapeTagShapeTag);
