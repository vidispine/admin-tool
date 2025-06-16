import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

import FileFilterForm from './FileListFilterForm';

function FileListFilter({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'FILE_FILTER_FORM',
  changeForm,
  storageId,
  initialValues = {
    queryParams: {
      first: 0,
      number: 10,
      prefixFirst: 0,
      prefixNumber: 10,
    },
  },
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Files';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const onClick = async () => {
    await changeForm(form, 'queryParams.first', 0);
    submitForm(form);
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          File List Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FileFilterForm
          form={form}
          onSubmit={formActions.onFileList}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          destroyOnUnmount={false}
          initialValues={initialValues}
          storageId={storageId}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(form)}>
          Reset
        </Button>
        <Button size="small" color="primary" onClick={onClick}>
          Filter
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withUI, withFormActions)(FileListFilter);
