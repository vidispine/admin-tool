import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CardList from '../ui/CardList';

import {
  JobBasicDisplay,
  JobCurrentDisplay,
  JobDataDisplay,
  JobStepDisplay,
  JobProblemDisplay,
} from './JobDisplay';

export default function JobCard({ jobProblemListDocument, ...props }) {
  if (props.jobDocument === undefined) {
    return null;
  }
  return (
    <CardList>
      <Card>
        <CardContent>
          <JobBasicDisplay {...props} />
        </CardContent>
      </Card>
      {jobProblemListDocument ? (
        <Card>
          <CardContent>
            <JobProblemDisplay jobProblemListDocument={jobProblemListDocument} />
          </CardContent>
        </Card>
      ) : null}
      <Card>
        <CardContent>
          <JobCurrentDisplay {...props} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <JobDataDisplay {...props} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <JobStepDisplay {...props} />
        </CardContent>
      </Card>
    </CardList>
  );
}
