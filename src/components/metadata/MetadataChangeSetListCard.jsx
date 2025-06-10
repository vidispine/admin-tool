import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SquareCard from '../ui/SquareCard';

import MetadataChangeSetMenu from './MetadataChangeSetMenu';
import MetadataDisplay from './MetadataDisplay';

function MetadataChangeSetListCard({
  metadataChangeSetDocument,
  MetadataChangeSetMenuProps,
  ...props
}) {
  const { changeSet: changeSetList } = metadataChangeSetDocument;
  if (changeSetList === undefined || !Array.isArray(changeSetList)) {
    return null;
  }
  return changeSetList.map((changeSet) => (
    <SquareCard id={changeSet.id}>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">{`Change Set - ${changeSet.id}`}</Typography>}
        action={
          MetadataChangeSetMenuProps ? (
            <MetadataChangeSetMenu changesetId={changeSet.id} {...MetadataChangeSetMenuProps} />
          ) : undefined
        }
      />
      <CardContent>
        <MetadataDisplay metadataDocument={changeSet.metadata} {...props} />
      </CardContent>
    </SquareCard>
  ));
}

export default MetadataChangeSetListCard;
