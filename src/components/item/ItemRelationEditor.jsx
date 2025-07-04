import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';

import * as formActions from '../../formactions/item';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';
import EditorCard from '../ui/EditorCard';
import TextGrid from '../ui/TextGrid';

import ItemRelationFormEdit from './ItemRelationFormEdit';

const ITEM_RELATION_FORM_EDIT = 'ITEM_RELATION_FORM_EDIT';

export function ItemRelationType({ itemRelationType }) {
  return (
    <>
      {itemRelationType.direction && (
        <>
          <TextGrid title="Source" value={itemRelationType.direction.source} />
          <TextGrid title="Target" value={itemRelationType.direction.target} />
          <TextGrid title="Type" value={itemRelationType.direction.type} />
        </>
      )}
      {itemRelationType.value && (
        <>
          <Divider />
          <TextGrid title="Metadata" />
          {itemRelationType.value.map((relationMetadata) => (
            <TextGrid
              key={relationMetadata.key}
              title={relationMetadata.key}
              value={relationMetadata.value}
            />
          ))}
        </>
      )}
    </>
  );
}

function ItemRelationDisplay({ itemRelationType }) {
  return <ItemRelationType itemRelationType={itemRelationType} />;
}

function ItemRelationEdit({ itemRelationType, toggleEdit, openSnackBar, onRefresh }) {
  return (
    <ItemRelationFormEdit
      form={ITEM_RELATION_FORM_EDIT}
      onSubmit={formActions.onUpdateItemRelation}
      onSubmitSuccess={() => {
        toggleEdit();
        onRefresh();
      }}
      onSubmitFail={() =>
        openSnackBar({ messageContent: 'Error Updating Relation', messageColor: 'secondary' })
      }
      relationId={itemRelationType.id}
      initialValues={{
        queryParams: {
          direction: itemRelationType.direction.type,
          relationMetadata: itemRelationType.value,
        },
      }}
    />
  );
}

function ItemRelationEditor({ itemRelationType, openRemove, submitForm, onRefresh, openSnackBar }) {
  return (
    <EditorCard
      editComponent={ItemRelationEdit}
      displayComponent={ItemRelationDisplay}
      cardHeaderProps={{
        subheader: `Relation ID: ${itemRelationType.id}`,
      }}
      itemRelationType={itemRelationType}
      onRemove={openRemove(itemRelationType.id)}
      onSave={() => submitForm(ITEM_RELATION_FORM_EDIT)}
      onRefresh={onRefresh}
      openSnackBar={openSnackBar}
    />
  );
}

export default compose(withFormActions, withUI)(ItemRelationEditor);
