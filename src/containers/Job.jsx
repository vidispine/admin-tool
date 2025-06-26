import { PureComponent } from 'react';

import { job as JobApi } from '@vidispine/vdt-api';

import JobAbort from '../components/job/JobAbort';
import JobCard from '../components/job/JobCard';
import JobDuplicate from '../components/job/JobDuplicate';
import JobPriority from '../components/job/JobPriority';
import JobRemove from '../components/job/JobRemove';
import JobTitle from '../components/job/JobTitle';
import { RUNNING_STATES, WAITING_STATES } from '../const/JobStates';
import withUI from '../hoc/withUI';

const JOB_PRIORITY_DIALOG = 'JOB_PRIORITY_DIALOG';
const JOB_DUPLICATE_DIALOG = 'JOB_DUPLICATE_DIALOG';
const JOB_ABORT_DIALOG = 'JOB_ABORT_DIALOG';
const JOB_REMOVE_DIALOG = 'JOB_REMOVE_DIALOG';

class Job extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onAutoRefresh = this.onAutoRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onFetchProblem = this.onFetchProblem.bind(this);
    this.onChangeAutoRefresh = this.onChangeAutoRefresh.bind(this);
    this.state = {
      jobDocument: undefined,
      jobProblemListDocument: undefined,
      autoRefresh: true,
    };
  }

  componentDidMount() {
    this.onRefresh();
    this.timer = setInterval(() => this.onAutoRefresh(), 2500);
    const { jobId } = this.props;
    document.title = `VidiCore Admin | Job | ${jobId}`;
  }

  UNSAFE_componentWillReceiveProps({ jobId }) {
    const { jobId: prevJobId } = this.props;
    if (prevJobId !== jobId) {
      this.onFetch(jobId);
      clearInterval(this.timer);
      this.timer = setInterval(() => this.onAutoRefresh(), 2500);
      this.setState({ autoRefresh: true });
      document.title = `VidiCore Admin | Job | ${jobId}`;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  onRefresh() {
    const { jobId } = this.props;
    this.onFetch(jobId);
  }

  onAutoRefresh() {
    const { jobDocument = {} } = this.state;
    const { status } = jobDocument;
    if (status === undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.setState({ autoRefresh: false });
      return;
    }
    if (this.timer && !RUNNING_STATES.includes(status)) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.setState({ autoRefresh: false });
      return;
    }
    this.onRefresh();
  }

  onFetch(jobId) {
    const queryParams = { metadata: true };
    try {
      JobApi.getJob({ jobId, queryParams })
        .then((response) => {
          this.setState({ jobDocument: response.data });
          const { status } = response.data;
          if (WAITING_STATES.includes(status)) this.onFetchProblem(jobId);
        })
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onChangeAutoRefresh() {
    const { autoRefresh: prevAutoRefresh } = this.state;
    const autoRefresh = !prevAutoRefresh;
    this.setState({ autoRefresh });
    if (autoRefresh === true && this.timer === undefined) {
      this.timer = setInterval(() => this.onAutoRefresh(), 2500);
    } else if (autoRefresh === false && this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  onFetchProblem(jobId) {
    try {
      JobApi.listJob({ path: `/API/job/${jobId}/problem` }).then((response) =>
        this.setState({ jobProblemListDocument: response.data }),
      );
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  render() {
    const { jobDocument, jobProblemListDocument, autoRefresh } = this.state;
    const { jobId, history } = this.props;
    return (
      <>
        <JobTitle
          title={jobId}
          onRefresh={this.onRefresh}
          autoRefresh={autoRefresh}
          onChangeAutoRefresh={this.onChangeAutoRefresh}
          code={jobDocument}
          priorityDialog={JOB_PRIORITY_DIALOG}
          duplicateDialog={JOB_DUPLICATE_DIALOG}
          abortDialog={JOB_ABORT_DIALOG}
          removeDialog={JOB_REMOVE_DIALOG}
        />
        <JobCard jobDocument={jobDocument} jobProblemListDocument={jobProblemListDocument} />
        <JobPriority
          dialogName={JOB_PRIORITY_DIALOG}
          onSuccess={this.onRefresh}
          jobDocument={jobDocument}
        />
        <JobDuplicate
          dialogName={JOB_DUPLICATE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
          jobDocument={jobDocument}
        />
        <JobAbort
          dialogName={JOB_ABORT_DIALOG}
          onSuccess={this.onRefresh}
          jobDocument={jobDocument}
        />
        <JobRemove
          dialogName={JOB_REMOVE_DIALOG}
          onSuccess={() => history.push('/job/')}
          jobDocument={jobDocument}
        />
      </>
    );
  }
}

export default withUI(Job);
