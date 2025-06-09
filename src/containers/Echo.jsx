import { PureComponent } from 'react';
import { connect } from 'react-redux';

import EchoCard from '../components/debug/EchoCard';

class Echo extends PureComponent {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFail = this.onFail.bind(this);
    this.state = {
      result: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | XML Echo';
  }

  onSuccess(response) {
    this.setState({
      result: JSON.stringify(response.data, null, 2),
      error: undefined,
    });
  }

  onFail(errors) {
    const error = errors?.['_error'];
    this.setState({ result: undefined, error });
  }

  render() {
    const { result, error } = this.state;
    return (
      <>
        <EchoCard
          result={result}
          error={error}
          onSuccess={this.onSuccess}
          onFail={this.onFail}
        />
      </>
    );
  }
}

export default connect()(Echo);
