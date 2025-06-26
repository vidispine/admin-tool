import { PureComponent } from 'react';

import { connect } from 'react-redux';

import { shapetag as api } from '@vidispine/vdt-api';

import * as actions from '../actions';
import ShapeTagCard from '../components/shapetag/ShapeTagCard';
import ShapeTagRemove from '../components/shapetag/ShapeTagRemove';
import ShapeTagTitle from '../components/shapetag/ShapeTagTitle';
import CodeModal from '../components/ui/CodeModal';

import StorageRuleTag from './StorageRuleTag';

const SHAPETAG_CODE_MODAL = 'SHAPETAG_CODE_MODAL';
const SHAPETAG_REMOVE_MODAL = 'SHAPETAG_REMOVE_MODAL';

class ShapeTagRule extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      transcodePresetDocument: undefined,
    };
  }

  componentDidMount() {
    const { tagName } = this.props;
    document.title = `VidiCore Admin | Shape Tag | ${tagName}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, tagName } = this.props;
    try {
      api
        .getShapeTag({ tagName })
        .then((response) => this.setState({ transcodePresetDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Shape Tag';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { tagName, modalName, closeModal, openModal, openSnackBar, history } = this.props;
    const { transcodePresetDocument } = this.state;
    return (
      <>
        <ShapeTagTitle
          openCode={() => openModal({ modalName: SHAPETAG_CODE_MODAL })}
          openRemove={() => openModal({ modalName: SHAPETAG_REMOVE_MODAL })}
          onRefresh={this.onRefresh}
          tagName={tagName}
        />
        {transcodePresetDocument && (
          <ShapeTagCard
            onRefresh={this.onRefresh}
            tagName={tagName}
            transcodePresetDocument={transcodePresetDocument}
          />
        )}
        <StorageRuleTag {...this.props} tagName={tagName} />
        <CodeModal
          isOpen={modalName === SHAPETAG_CODE_MODAL}
          toggleDialogue={closeModal}
          code={transcodePresetDocument}
          title="TranscodePresetDocument"
        />
        <ShapeTagRemove
          isOpen={modalName === SHAPETAG_REMOVE_MODAL}
          tagName={tagName}
          openSnackBar={openSnackBar}
          closeModal={closeModal}
          history={history}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { tagName } = ownProps.match.params;
  const {
    ui: { modalName },
  } = state;
  return {
    modalName,
    tagName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeTagRule);
