import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import UnstyledLink from '../ui/UnstyledLink';
import CollectionEntityRemove from './CollectionEntityRemove';
import withDialogProps from '../../hoc/withDialogProps';

const COLLECTION_TRANSIENT_FIELDS = [
  '__collection',
  '__ancestor_collection',
  '__parent_collection',
];
const REMOVE_COLLECTION_ENTITY_DIALOG = 'REMOVE_COLLECTION_ENTITY_DIALOG';
const PARENT = 'Parent';
const ANCESTOR = 'Ancestor';

function MetadataCollectionTable({
  metadataDocument = {},
  onSuccess,
  dialogProps,
  entityType,
  entityId,
  onOpen,
}) {
  const itemCollection = [];
  const { timespan: metadataTimespanList = [] } = metadataDocument;
  const infTimeSpan = metadataTimespanList.find((thisTimespan) => (thisTimespan.start === '-INF' && thisTimespan.end === '+INF'));
  if (infTimeSpan) {
    const { field: fieldList = [] } = infTimeSpan;
    fieldList.forEach((thisField) => {
      if (COLLECTION_TRANSIENT_FIELDS.includes(thisField.name)) {
        const { value: allValues = [] } = thisField;
        const firstValue = allValues.find((thisValue) => (thisValue.value));
        if (firstValue) {
          const relation = (thisField.name === '__collection' || thisField.name === '__parent_collection') ? PARENT : ANCESTOR;
          itemCollection.push({
            relation,
            id: firstValue.value,
          });
        }
      }
    });
  }
  const onOpenRemove = onOpen(REMOVE_COLLECTION_ENTITY_DIALOG);
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {itemCollection.map((collection) => (
            <TableRow
              key={`${collection.relation}_${collection.id}`}
              hover
            >
              <TableCell>
                <UnstyledLink to={`/collection/${collection.id}/`}>
                  {collection.id}
                </UnstyledLink>
              </TableCell>
              <TableCell>
                <UnstyledLink to={`/collection/${collection.id}/`}>
                  {collection.relation}
                </UnstyledLink>
              </TableCell>
              <TableCell>
                {collection.relation === PARENT ? (
                  <IconButton
                    size="small"
                    onClick={() => onOpenRemove({
                      collectionId: collection.id,
                    })}
                  >
                    <DeleteForever />
                  </IconButton>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CollectionEntityRemove
        dialogName={REMOVE_COLLECTION_ENTITY_DIALOG}
        onSuccess={onSuccess}
        entityType={entityType}
        entityId={entityId}
        {...dialogProps}
      />
    </>
  );
}

export default withDialogProps(MetadataCollectionTable);
