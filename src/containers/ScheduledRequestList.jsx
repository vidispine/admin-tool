import { useState, useEffect } from 'react';

import ScheduledRequestCard from '../components/scheduledrequest/ScheduledRequestCard';
import ScheduledRequestFilterCard from '../components/scheduledrequest/ScheduledRequestFilterCard';
import ScheduledRequestRemoveAll from '../components/scheduledrequest/ScheduledRequestRemoveAll';
import ScheduledRequestTitle from '../components/scheduledrequest/ScheduledRequestTitle';
import withFormActions from '../hoc/withFormActions';

const SCHEDULED_FILTER_FORM = 'SCHEDULED_FILTER_FORM';
const SCHEDULED_REMOVEALL = 'SCHEDULED_REMOVEALL';

export default withFormActions(({ submitForm }) => {
  document.title = 'VidiCore Admin | Scheduled Requests';
  const onRefresh = () => {
    submitForm(SCHEDULED_FILTER_FORM);
  };
  const [scheduledRequestListDocument, setScheduledRequestListDocument] = useState();
  const onSuccess = ({ data }) => setScheduledRequestListDocument(data);
  useEffect(onRefresh, [submitForm]);
  return (
    <>
      <ScheduledRequestTitle
        code={scheduledRequestListDocument}
        codeModal="ScheduledRequestListDocument"
        onRefresh={onRefresh}
        removeModal={SCHEDULED_REMOVEALL}
      />
      <ScheduledRequestFilterCard form={SCHEDULED_FILTER_FORM} onSuccess={onSuccess} />
      {scheduledRequestListDocument && (
        <ScheduledRequestCard
          scheduledRequestListDocument={scheduledRequestListDocument}
          onSuccess={onRefresh}
        />
      )}
      <ScheduledRequestRemoveAll dialogName={SCHEDULED_REMOVEALL} onSuccess={onRefresh} />
    </>
  );
});
