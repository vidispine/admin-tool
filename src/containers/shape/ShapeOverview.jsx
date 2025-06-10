import { PureComponent } from 'react';

import { shape as api } from '@vidispine/vdt-api';

import ItemShapeCreate from '../../components/item/ItemShapeCreate';
import ShapeComponentAnalyze from '../../components/shape/ShapeComponentAnalyze';
import ShapeComponentAssociateFile from '../../components/shape/ShapeComponentAssociateFile';
import ShapeComponentCopy from '../../components/shape/ShapeComponentCopy';
import ShapeComponentCopyShape from '../../components/shape/ShapeComponentCopyShape';
import ShapeComponentDelete from '../../components/shape/ShapeComponentDelete';
import ShapeComponentMove from '../../components/shape/ShapeComponentMove';
import ShapeComponentMoveShape from '../../components/shape/ShapeComponentMoveShape';
import ShapeComponentRemoveFile from '../../components/shape/ShapeComponentRemoveFile';
import ShapeOverviewComponent from '../../components/shape/ShapeOverview';
import ShapeParams from '../../components/shape/ShapeParams';
import withSnackbar from '../../hoc/withSnackbar';

const ITEM_SHAPE_CREATE_DIALOG = 'ITEM_SHAPE_CREATE_DIALOG';
const SHAPE_COMPONENT_DELETE_DIALOG = 'SHAPE_COMPONENT_DELETE_DIALOG';
const SHAPE_COMPONENT_ANALYZE_DIALOG = 'SHAPE_COMPONENT_ANALYZE_DIALOG';
const SHAPE_COMPONENT_COPY_DIALOG = 'SHAPE_COMPONENT_COPY_DIALOG';
const SHAPE_COMPONENT_COPY_SHAPE_DIALOG = 'SHAPE_COMPONENT_COPY_SHAPE_DIALOG';
const SHAPE_COMPONENT_MOVE_DIALOG = 'SHAPE_COMPONENT_MOVE_DIALOG';
const SHAPE_COMPONENT_MOVE_SHAPE_DIALOG = 'SHAPE_COMPONENT_MOVE_SHAPE_DIALOG';
const SHAPE_COMPONENT_ASSOCIATE_FILE_DIALOG = 'SHAPE_COMPONENT_ASSOCIATE_FILE_DIALOG';
const SHAPE_COMPONENT_UNASSOCIATE_FILE_DIALOG = 'SHAPE_COMPONENT_UNASSOCIATE_FILE_DIALOG';

class ShapeOverview extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      shapeDocument: undefined,
    };
  }

  componentDidMount() {
    const { setOnRefresh } = this.props;
    if (setOnRefresh) setOnRefresh(this.onRefresh);
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ shapeId, itemId }) {
    const { shapeId: prevItemId } = this.props;
    if (prevItemId !== shapeId) {
      this.onFetch(itemId, shapeId);
      document.title = `VidiCore Admin | Shape | ${shapeId}`;
    }
  }

  onRefresh() {
    const { itemId, shapeId } = this.props;
    this.onFetch(itemId, shapeId);
  }

  onFetch(itemId, shapeId) {
    try {
      api
        .getShape({
          itemId,
          shapeId,
          queryParams: { includePlaceholder: true },
        })
        .then((response) => this.setState({ shapeDocument: response.data }))
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
    const shapeDocument = response.data;
    this.setState({ shapeDocument });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      shapeId,
      itemId,
      history,
    } = this.props;
    const { shapeDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={shapeDocument}
            codeModal="ShapeDocument"
            onRefresh={this.onRefresh}
            breadcrumbList={['Overview']}
            createShapeModal={ITEM_SHAPE_CREATE_DIALOG}
          />
        )}
        {TabComponent && <TabComponent />}
        <ShapeParams
          shapeId={shapeId}
          itemId={itemId}
          onSuccess={this.onSuccess}
          initialValues={{ queryParams: { includePlaceholder: true } }}
        />
        {shapeDocument && (
          <>
            <ShapeOverviewComponent
              shapeDocument={shapeDocument}
              shapeId={shapeId}
              itemId={itemId}
              onRefresh={this.onRefresh}
              ShapeComponentMenuProps={{
                removeModal: SHAPE_COMPONENT_DELETE_DIALOG,
                analyzeModal: SHAPE_COMPONENT_ANALYZE_DIALOG,
                copyToComponentModal: SHAPE_COMPONENT_COPY_DIALOG,
                copyToShapeModal: SHAPE_COMPONENT_COPY_SHAPE_DIALOG,
                moveToComponentModal: SHAPE_COMPONENT_MOVE_DIALOG,
                moveToShapeModal: SHAPE_COMPONENT_MOVE_SHAPE_DIALOG,
                associateFileModal: SHAPE_COMPONENT_ASSOCIATE_FILE_DIALOG,
                removeFileModal: SHAPE_COMPONENT_UNASSOCIATE_FILE_DIALOG,
              }}
            />
            <ItemShapeCreate
              dialogName={ITEM_SHAPE_CREATE_DIALOG}
              onSuccess={(response) => history.push(`/item/${itemId}/shape/${response.data.id}/`)}
              itemId={itemId}
              initialValues={{ shapeDocument: JSON.stringify(shapeDocument, null, 2) }}
            />
            <ShapeComponentCopy
              dialogName={SHAPE_COMPONENT_COPY_DIALOG}
              onSuccess={(response, dispatch, props) =>
                history.push(`/item/${props.values.targetItemId}/shape/${response.data.id}/`)
              }
              itemId={itemId}
              shapeId={shapeId}
            />
            <ShapeComponentCopyShape
              dialogName={SHAPE_COMPONENT_COPY_SHAPE_DIALOG}
              onSuccess={(response, dispatch, props) =>
                history.push(`/item/${props.values.targetItemId}/shape/${response.data.id}/`)
              }
              itemId={itemId}
              shapeId={shapeId}
            />
            <ShapeComponentMove
              dialogName={SHAPE_COMPONENT_MOVE_DIALOG}
              onSuccess={this.onRefresh}
              itemId={itemId}
              shapeId={shapeId}
            />
            <ShapeComponentMoveShape
              dialogName={SHAPE_COMPONENT_MOVE_SHAPE_DIALOG}
              onSuccess={this.onRefresh}
              itemId={itemId}
              shapeId={shapeId}
            />
            <ShapeComponentDelete
              dialogName={SHAPE_COMPONENT_DELETE_DIALOG}
              shapeId={shapeId}
              itemId={itemId}
              onSuccess={this.onRefresh}
              initialValues={{ queryParams: { keepFiles: true } }}
            />
            <ShapeComponentAnalyze
              dialogName={SHAPE_COMPONENT_ANALYZE_DIALOG}
              shapeId={shapeId}
              itemId={itemId}
              onSuccess={(response) => history.push(`/job/${response.data.jobId}/`)}
            />
            <ShapeComponentAssociateFile
              dialogName={SHAPE_COMPONENT_ASSOCIATE_FILE_DIALOG}
              shapeId={shapeId}
              itemId={itemId}
              onSuccess={this.onRefresh}
            />
            <ShapeComponentRemoveFile
              dialogName={SHAPE_COMPONENT_UNASSOCIATE_FILE_DIALOG}
              shapeId={shapeId}
              itemId={itemId}
              onSuccess={this.onRefresh}
            />
          </>
        )}
      </>
    );
  }
}

export default withSnackbar(ShapeOverview);
