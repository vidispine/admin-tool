import React from 'react';
import { shape as api } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';
import GraphViz from '../../components/ui/GraphViz';

class ShapeGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      graphImage: undefined,
      graphDot: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ shapeId, itemId }) {
    const { shapeId: prevItemId } = this.props;
    if (prevItemId !== shapeId) {
      this.onFetch(itemId, shapeId);
      document.title = `VidiCore Admin | Shape | ${shapeId} | Graph`;
    }
  }

  onRefresh() {
    const { itemId, shapeId } = this.props;
    this.onFetch(itemId, shapeId);
  }

  onFetch(itemId, shapeId) {
    const { useGraphViz = true } = this.props;
    try {
      if (useGraphViz) {
        api.getShapeGraphDot({
          itemId,
          shapeId,
        })
          .then((response) => {
            this.setState({ graphDot: response.data });
          })
          .catch((error) => this.onRefreshError(error));
      } else {
        api.getShapeGraph({
          itemId,
          shapeId,
          responseType: 'blob',
        })
          .then((response) => {
            this.setState({ graphImage: response.data });
          })
          .catch((error) => this.onRefreshError(error));
      }
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Shape';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      useGraphViz = true,
    } = this.props;
    const { graphImage, graphDot } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            breadcumbList={['Graph']}
            code={graphDot}
            codeModal="DOT"
            codeVariant="text"
          />
        )}
        {useGraphViz === false && graphImage ? (
          <img
            alt="graph"
            src={URL.createObjectURL(graphImage)}
            style={{ width: '100%' }}
          />
        ) : null}
        {useGraphViz === true && graphDot ? (
          <GraphViz
            dot={graphDot}
            width="100%"
            height="80vh"
          />
        ) : null}

      </>
    );
  }
}

export default withSnackbar(ShapeGraph);
