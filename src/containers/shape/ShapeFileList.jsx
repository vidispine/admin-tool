import React from 'react';
import { shape as api } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';
import ShapeFileParams from '../../components/shape/ShapeFileParams';
import FileListTable from '../../components/file/FileListTable';
import withCard from '../../hoc/withCard';

const FileListCard = withCard(FileListTable);

class ShapeFileList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      fileListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ shapeId, itemId }) {
    const { shapeId: prevItemId } = this.props;
    if (prevItemId !== shapeId) {
      this.onFetch(itemId, shapeId);
      document.title = `VidiCore Admin | Shape | ${shapeId} | File`;
    }
  }

  onRefresh() {
    const { itemId, shapeId } = this.props;
    this.onFetch(itemId, shapeId);
  }

  onFetch(itemId, shapeId) {
    try {
      api.getShape({
        itemId,
        shapeId,
        path: `/API/item/${itemId}/shape/${shapeId}/file`,
      })
        .then((response) => {
          const fileListDocument = response.data;
          this.setState({ fileListDocument });
        })
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onSuccess(response) {
    const fileListDocument = response.data;
    this.setState({ fileListDocument });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      itemId,
      shapeId,
    } = this.props;
    const { fileListDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            breadcumbList={['Files']}
            code={fileListDocument}
            codeModal="FileListDocument"
          />
        )}
        <ShapeFileParams
          shapeId={shapeId}
          itemId={itemId}
          onSuccess={this.onSuccess}
        />
        {fileListDocument && (<FileListCard fileListDocument={fileListDocument} />)}
      </>
    );
  }
}

export default withSnackbar(ShapeFileList);
