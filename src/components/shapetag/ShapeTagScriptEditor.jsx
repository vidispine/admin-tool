import * as formActions from '../../formactions/shapetag';
import withUI from '../../hoc/withUI';
import Editor from '../ui/Editor';

import ShapeTagScriptDisplay from './ShapeTagScriptDisplay';
import ShapeTagScriptForm from './ShapeTagScriptForm';

const EDIT_SHAPETAG_SCRIPT_FORM = 'EDIT_SHAPETAG_SCRIPT_FORM';

function ShapeTagScriptEditor({ tagName, shapeTagScript, openSnackBar, onRefresh, onSuccess }) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Shape Tag Script Updated';
    openSnackBar({ messageContent });
    if (onRefresh) onRefresh();
    if (onSuccess) onSuccess(response, dispatch, props);
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Shape Tag Script';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { tagName };
  const displayProps = { value: shapeTagScript };
  const initialValues = { tagName, shapeTagScript };
  return (
    <Editor
      formComponent={ShapeTagScriptForm}
      displayComponent={ShapeTagScriptDisplay}
      formName={EDIT_SHAPETAG_SCRIPT_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdateScript}
      formProps={formProps}
      displayProps={displayProps}
      initialValues={initialValues}
      tagName={tagName}
    />
  );
}

export default withUI(ShapeTagScriptEditor);
