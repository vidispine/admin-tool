import React from 'react';
import { shape as api } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';

class ShapeGraph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      graphImage: undefined,
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
    try {
      api.getShapeGraph({
        itemId,
        shapeId,
        responseType: 'blob',
      })
        .then((response) => {
          this.setState({ graphImage: response.data });
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

  render() {
    const {
      titleComponent: TitleComponent,
    } = this.props;
    const { graphImage } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            breadcumbList={['Graph']}
          />
        )}
        {graphImage && <img alt="graph" src={URL.createObjectURL(graphImage)} style={{ width: '100%' }} />}

      </>
    );
  }
}

export default withSnackbar(ShapeGraph);
