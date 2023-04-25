import React from 'react';

import { configuration as ConfigurationApi } from '@vidispine/vdt-api';
import JobPriorityCard from '../../components/configuration/jobpriority/JobPriorityCard';
import JobPriorityRemove from '../../components/configuration/jobpriority/JobPriorityRemove';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

const JOBPRIORITY_REMOVE_DIALOG = 'JOBPRIORITY_REMOVE_DIALOG';

class JobPriority extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      jobPriorityConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | Job Priority';
  }

  onRefresh() {
    try {
      ConfigurationApi.getJobPriorityConfiguration()
        .then((response) => this.setState({ jobPriorityConfigurationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Job Priority Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { jobPriorityConfigurationDocument } = this.state;
    return (
      <>
        <TitleHeader
          parentTitle="Configuration"
          parentTo="/configuration/"
          title="Job Priority"
          helpTo="/ref/property.html#jdefault-job-priority-configuration"
          onRefresh={this.onRefresh}
          code={jobPriorityConfigurationDocument}
          codeModal="JobPriorityConfigurationDocument"
          removeModal={JOBPRIORITY_REMOVE_DIALOG}
        />
        { jobPriorityConfigurationDocument
        && (
        <JobPriorityCard
          jobPriorityConfigurationDocument={jobPriorityConfigurationDocument}
          onSuccess={this.onRefresh}
        />
        )}
        <JobPriorityRemove
          dialogName={JOBPRIORITY_REMOVE_DIALOG}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(JobPriority);
