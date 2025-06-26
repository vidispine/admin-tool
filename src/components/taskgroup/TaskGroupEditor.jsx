import { PureComponent } from 'react';

import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import * as actions from '../../actions';
import * as formActions from '../../formactions/taskgroup';

import TaskGroupDisplay from './TaskGroupDisplay';
import TaskGroupForm from './TaskGroupForm';

const EDIT_TASKGROUP_FORM = 'EDIT_TASKGROUP_FORM';

class ImportSettingsEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      isEditing: false,
    };
  }

  toggleEdit() {
    const { isEditing: currentIsEditing } = this.state;
    this.setState({ isEditing: !currentIsEditing });
  }

  render() {
    const { taskGroupDocument, submitForm, groupName, onRefresh, openSnackBar } = this.props;
    const { isEditing } = this.state;
    const initialValues = {
      taskGroupDocument,
    };
    const onSubmitSuccess = () => {
      this.toggleEdit();
      const messageContent = 'Task Group Saved';
      openSnackBar({ messageContent });
      if (onRefresh) {
        onRefresh();
      }
    };
    const onSubmitFail = () => {
      const messageContent = 'Error Updating Task Group';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    };
    return (
      <>
        <CardHeader
          action={
            <Grid container direction="row-reverse" alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Edit"
                  checked={isEditing}
                  onChange={this.toggleEdit}
                />
              </Grid>
            </Grid>
          }
        />
        <CardContent>
          {isEditing ? (
            <TaskGroupForm
              form={EDIT_TASKGROUP_FORM}
              initialValues={initialValues}
              onSubmit={formActions.onUpdate}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              groupName={groupName}
            />
          ) : (
            <TaskGroupDisplay taskGroupDocument={taskGroupDocument} />
          )}
        </CardContent>
        {isEditing && (
          <>
            <Divider />
            <AccordionActions>
              <Button size="small" onClick={this.toggleEdit}>
                Cancel
              </Button>
              <Button onClick={() => submitForm(EDIT_TASKGROUP_FORM)} size="small" color="primary">
                Save
              </Button>
            </AccordionActions>
          </>
        )}
      </>
    );
  }
}

const mapDispatchToProps = {
  submitForm: submit,
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(ImportSettingsEditor);
