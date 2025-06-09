import * as formActions from '../../formactions/sequence';

import Editor from '../ui/Editor';
import withUI from '../../hoc/withUI';
import ItemSequenceDisplay from './ItemSequenceDisplay';
import ItemSequenceForm from './ItemSequenceForm';
import formatXML from '../../utils/formatXML';

const EDIT_ITEM_SEQUENCE_FORM = 'EDIT_ITEM_SEQUENCE_FORM';

function ItemSequenceEditor({
  body,
  openSnackBar,
  onRefresh,
  contentType,
  itemId,
  format,
}) {
  const onSubmitSuccess = () => {
    const messageContent = 'Sequence Saved';
    openSnackBar({ messageContent });
    if (onRefresh) {
      onRefresh();
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Sequence';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { itemId, format, codeFieldMode: contentType };
  const displayProps = { value: body, variant: contentType };
  const initialValues = {
    itemId,
    format,
    body: contentType === 'application/xml' ? formatXML(body) : body,
    headers: { contentType },
  };
  return (
    <Editor
      formComponent={ItemSequenceForm}
      displayComponent={ItemSequenceDisplay}
      formName={EDIT_ITEM_SEQUENCE_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateItemSequence}
      formProps={formProps}
      displayProps={displayProps}
      initialValues={initialValues}
    />
  );
}

export default withUI(ItemSequenceEditor);
