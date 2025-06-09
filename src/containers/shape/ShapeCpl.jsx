import { PureComponent } from 'react';
import { shape as api } from '@vidispine/vdt-api';

import withSnackbar from '../../hoc/withSnackbar';
import CodeMirror from '../../components/ui/CodeMirror';
import formatXML from '../../utils/formatXML';

class ShapeCpl extends PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      cpl: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ shapeId, itemId }) {
    const { shapeId: prevItemId } = this.props;
    if (prevItemId !== shapeId) {
      this.onFetch(itemId, shapeId);
      document.title = `VidiCore Admin | Shape | ${shapeId} | CPL`;
    }
  }

  onRefresh() {
    const { itemId, shapeId } = this.props;
    this.onFetch(itemId, shapeId);
  }

  onFetch(itemId, shapeId) {
    try {
      api.getShapeCpl({
        itemId,
        shapeId,
      })
        .then((response) => {
          this.setState({ cpl: response.data });
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
    const { cpl } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            breadcumbList={['CPL']}
          />
        )}
        {cpl && (
        <CodeMirror
          value={formatXML(cpl) || ''}
          options={{
            readOnly: true,
            theme: 'material',
            mode: 'xml',
            lineWrapping: true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          }}
        />
        )}

      </>
    );
  }
}

export default withSnackbar(ShapeCpl);
