import * as formActions from '../../formactions/fieldgroup';
import withUI from '../../hoc/withUI';
import Editor from '../ui/Editor';

function FieldGroupEditor({
  metadataFieldGroupDocument,
  groupName,
  openSnackBar,
  onRefresh,
  ...props
}) {
  const EDIT_FIELDGROUP_FORM = 'EDIT_FIELDGROUP_FORM';
  const onSubmitSuccess = () => {
    const messageContent = 'Field Group Saved';
    openSnackBar({ messageContent });
    if (onRefresh) {
      onRefresh();
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Field Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const formProps = { groupName };
  const displayProps = { metadataFieldGroupDocument };
  const initialValues = { metadataFieldGroupDocument };
  return (
    <Editor
      formName={EDIT_FIELDGROUP_FORM}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFail={onSubmitFail}
      onSubmit={formActions.onUpdate}
      formProps={formProps}
      displayProps={displayProps}
      initialValues={initialValues}
      {...props}
    />
  );
}

export default withUI(FieldGroupEditor);
