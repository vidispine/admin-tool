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
import * as formActions from '../../formactions/resource';

import ResourceDisplay from './ResourceDisplay';
import ResourceForm from './ResourceForm';

const EDIT_RESOURCE_FORM = 'EDIT_RESOURCE_FORM';

class ResourceEditor extends PureComponent {
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
    const { resourceType, resourceId, resourceDocument, submitForm, onRefresh, openSnackBar } =
      this.props;
    const { isEditing } = this.state;
    const initialValues = {
      resourceDocument,
    };
    const onSubmitSuccess = () => {
      this.toggleEdit();
      const messageContent = 'Resource Saved';
      openSnackBar({ messageContent });
      if (onRefresh) {
        onRefresh();
      }
    };
    const onSubmitFail = () => {
      const messageContent = 'Error Updating Resource';
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
            <ResourceForm
              form={EDIT_RESOURCE_FORM}
              initialValues={initialValues}
              onSubmit={formActions.onUpdate}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              resourceId={resourceId}
              resourceType={resourceType}
            />
          ) : (
            <ResourceDisplay resourceDocument={resourceDocument} resourceType={resourceType} />
          )}
        </CardContent>
        {isEditing && (
          <>
            <Divider />
            <AccordionActions>
              <Button size="small" onClick={this.toggleEdit}>
                Cancel
              </Button>
              <Button onClick={() => submitForm(EDIT_RESOURCE_FORM)} size="small" color="primary">
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

export default connect(null, mapDispatchToProps)(ResourceEditor);
