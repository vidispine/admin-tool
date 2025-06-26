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

import ItemThumbnailSpritesheetParamsForm from './ItemThumbnailSpritesheetParamsForm';

export const ITEM_THUMBNAILSPRITESHEET_PARAMS_FORM = 'ITEM_THUMBNAILSPRITESHEET_PARAMS_FORM';

function ItemThumbnailSpritesheetParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  itemId,
  form = ITEM_THUMBNAILSPRITESHEET_PARAMS_FORM,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) {
      onSuccess(response, dispatch, props);
    }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Item Thumbnail Spritesheet';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) {
      onFail(error, dispatch, props);
    }
  };
  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography variant="subtitle2" color="textSecondary">
          Item Thumbnail Spritesheet Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ItemThumbnailSpritesheetParamsForm
          form={form}
          onSubmit={formActions.onGetThumbnailSpritesheet}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          itemId={itemId}
          {...formProps}
        />
      </AccordionDetails>
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

export default compose(withSnackbar, withFormActions)(ItemThumbnailSpritesheetParams);
