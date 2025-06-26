import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/search';
import withExpansion from '../../hoc/withExpansion';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import ItemSearchForm from '../item/ItemSearchForm';

export const SEARCH_FORM = 'SEARCH_FORM';

function SearchDocument({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  expanded,
  onChangeExpansion,
  form = SEARCH_FORM,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onChangeExpansion) {
      onChangeExpansion(null, false);
    }
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Searching';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion expanded={expanded} onChange={onChangeExpansion}>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Search Document
        </Typography>
      </AccordionSummary>
      <CardContent>
        <ItemSearchForm
          form={form}
          onSubmit={formActions.onSearch}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          {...formProps}
        />
      </CardContent>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(form)}>
          Reset
        </Button>
        <Button size="small" color="primary" onClick={() => submitForm(form)}>
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions, withExpansion)(SearchDocument);
