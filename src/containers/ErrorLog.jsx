import { PureComponent } from 'react';

import { errorlog as api } from '@vidispine/vdt-api';

import ErrorLogCard from '../components/errorlog/ErrorLogCard';
import ErrorLogTitle from '../components/errorlog/ErrorLogTitle';
import withSnackbar from '../hoc/withSnackbar';

class ErrorLog extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      errorLogListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Error Log';
    this.onRefresh();
  }

  onRefresh() {
    try {
      api
        .listErrorLogs()
        .then((response) => this.setState({ errorLogListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Error Logs';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { errorLogListDocument } = this.state;
    return (
      <>
        <ErrorLogTitle
          code={errorLogListDocument}
          codeModal="ErrorLogListDocument"
          onRefresh={this.onRefresh}
        />
        {errorLogListDocument && <ErrorLogCard errorLogListDocument={errorLogListDocument} />}
      </>
    );
  }
}

export default withSnackbar(ErrorLog);
