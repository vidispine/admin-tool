import { PureComponent } from 'react';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';

import PlayIcon from '@material-ui/icons/PlayArrow';
import TestCard from '../components/javascript/TestCard';
import TitleHeader from '../components/ui/TitleHeader';
import withFormActions from '../hoc/withFormActions';

const TEST_FORM = 'TEST_FORM';

class Javascript extends PureComponent {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFail = this.onFail.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
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

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(TEST_FORM);
  }

  render() {
    const { location } = this.props;
    const { result, error } = this.state;
    const initialValues = location?.state?.initialValues;
    return (
      <>
        <TitleHeader
          title="Javascript Test"
          helpTo="/system/integration/javascript.html"
          actionComponent={(
            <Button
              variant="outlined"
              color="primary"
              onClick={this.onRefresh}
              startIcon={<PlayIcon />}
            >
              RUN (ctrl-enter)
            </Button>
          )}
        />

        <TestCard
          result={result}
          error={error}
          onSuccess={this.onSuccess}
          onFail={this.onFail}
          initialValues={initialValues}
          form={TEST_FORM}
        />
      </>
    );
  }
}

export default compose(withFormActions)(Javascript);
