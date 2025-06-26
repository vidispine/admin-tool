import { PureComponent } from 'react';

import { selftest as api } from '@vidispine/vdt-api';

import SelfTestListCard from '../components/selftest/SelfTestListCard';
import SelfTestTitle from '../components/selftest/SelfTestTitle';
import withSnackbar from '../hoc/withSnackbar';

class SelfTest extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      selfTestDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | Self Test';
  }

  onRefresh() {
    try {
      api
        .listSelfTest()
        .then((response) => this.setState({ selfTestDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Getting Self Test';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { selfTestDocument } = this.state;
    return (
      <>
        <SelfTestTitle
          onRefresh={this.onRefresh}
          code={selfTestDocument}
          codeModal="SelfTestDocument"
        />
        {selfTestDocument && <SelfTestListCard selfTestDocument={selfTestDocument} />}
      </>
    );
  }
}

export default withSnackbar(SelfTest);
