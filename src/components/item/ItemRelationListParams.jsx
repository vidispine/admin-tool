import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';

import * as formActions from '../../formactions/item';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

import ItemRelationListParamsForm from './ItemRelationListParamsForm';

export const ITEM_RELATION_LIST_PARAMS_FORM = 'ITEM_RELATION_LIST_PARAMS_FORM';

function ItemRelationListParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  itemId,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Item Relations';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Item Relation Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ItemRelationListParamsForm
          form={ITEM_RELATION_LIST_PARAMS_FORM}
          onSubmit={formActions.onListItemRelation}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          {...formProps}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => resetForm(ITEM_RELATION_LIST_PARAMS_FORM)}>
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(ITEM_RELATION_LIST_PARAMS_FORM)}
        >
          Update
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default compose(withSnackbar, withFormActions)(ItemRelationListParams);
