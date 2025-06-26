import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import ExternalIdLink from '../externalid/ExternalIdLink';
import SquareCard from '../ui/SquareCard';

import QuotaDisplay from './QuotaDisplay';

export default function AccessControlCard({ quotaRuleDocument, openRemove }) {
  const { id: ruleId } = quotaRuleDocument;
  return (
    <SquareCard>
      <CardContent>
        <CardHeader
          subheader={ruleId}
          action={
            <>
              <IconButton onClick={openRemove(ruleId)}>
                <Delete />
              </IconButton>
              <ExternalIdLink entityId={ruleId} entityType="quota" />
            </>
          }
        />
        <CardContent>
          <QuotaDisplay quotaRuleDocument={quotaRuleDocument} />
        </CardContent>
      </CardContent>
    </SquareCard>
  );
}
