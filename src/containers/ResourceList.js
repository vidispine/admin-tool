import React from 'react';
import { connect } from 'react-redux';
import startCase from 'lodash.startcase';

import { resource as api } from '@vidispine/vdt-api';
import ResourceListTitle from '../components/resource/ResourceListTitle';
import ResourceListCard from '../components/resource/ResourceListCard';
import ResourceDialog from '../components/resource/ResourceDialog';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';

const RESOURCELIST_CODE_MODAL = 'RESOURCELIST_CODE_MODAL';
const RESOURCE_CREATE_MODAL = 'RESOURCE_CREATE_MODAL';

class ResourceList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      resourceListDocument: undefined,
    };
  }

  componentDidMount() {
    const { resourceType } = this.props;
    document.title = `VidiCore Admin | Resource | ${startCase(resourceType)}`;
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ resourceType }) {
    const { resourceType: prevResourceType } = this.props;
    if (resourceType !== prevResourceType) {
      this.setState({ resourceListDocument: undefined });
      this.onFetch(resourceType);
      document.title = `VidiCore Admin | Resource | ${startCase(resourceType)}`;
    }
  }

  onFetch(resourceType) {
    const { openSnackBar } = this.props;
    try {
      api.listResourceType({ resourceType })
        .then((response) => this.setState({ resourceListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Resource List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  onRefresh() {
    const { resourceType } = this.props;
    this.onFetch(resourceType);
  }

  render() {
    const {
      modalName,
      closeModal,
      openModal,
      resourceType,
      history,
    } = this.props;
    const {
      resourceListDocument,
    } = this.state;
    return (
      <>
        <ResourceListTitle
          openCode={() => openModal({ modalName: RESOURCELIST_CODE_MODAL })}
          openCreate={() => openModal({ modalName: RESOURCE_CREATE_MODAL })}
          onRefresh={this.onRefresh}
          resourceType={resourceType}
        />
        { resourceListDocument
        && (
        <ResourceListCard
          resourceType={resourceType}
          resourceListDocument={resourceListDocument}
        />
        )}
        <CodeModal
          isOpen={(modalName === RESOURCELIST_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={resourceListDocument}
          title="ResourceListDocument"
        />
        <ResourceDialog
          resourceType={resourceType}
          isOpen={(modalName === RESOURCE_CREATE_MODAL)}
          closeModal={closeModal}
          history={history}
        />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { resourceType } = ownProps.match.params;
  const { ui: { modalName } } = state;
  return {
    modalName,
    resourceType,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList);
