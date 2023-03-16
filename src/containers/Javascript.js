import React from 'react';

import TestCard from '../components/javascript/TestCard';

export default class Javascript extends React.PureComponent {
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
    document.title = 'VidiCore Admin | Javascript Test';
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
    const { location } = this.props;
    const { result, error } = this.state;
    const initialValues = location?.state?.initialValues;
    return (
      <>
        <TestCard
          result={result}
          error={error}
          onSuccess={this.onSuccess}
          onFail={this.onFail}
          initialValues={initialValues}
        />
      </>
    );
  }
}
