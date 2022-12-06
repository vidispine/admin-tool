import React from 'react';

import { job as JobApi } from '@vidispine/vdt-api';
import TitleHeader from '../components/ui/TitleHeader';
import JobProblemListCard from '../components/job/JobProblemListCard';

import withSnackbar from '../hoc/withSnackbar';

class JobProblemList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      jobProblemListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | Job Problems';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      JobApi.listJob({ path: '/API/job/problem' })
        .then((response) => this.setState({ jobProblemListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Job Problems';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { jobProblemListDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Job Problems"
          helpTo="/ref/job.html"
          onRefresh={this.onRefresh}
          code={jobProblemListDocument}
          codeModal="JobProblemListDocument"
        />
        {jobProblemListDocument
        && (
        <JobProblemListCard
          jobProblemListDocument={jobProblemListDocument}
        />
        )}
      </>
    );
  }
}

export default withSnackbar(JobProblemList);
