import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Delete from '@material-ui/icons/Delete';
import startCase from 'lodash.startcase';
import { FormSection, FieldArray } from 'redux-form';

import withErrorBoundary from '../../hoc/withErrorBoundary';

import TextButton from './TextButton';

const hoverStyle = (theme) => ({
  onHover: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  noHover: {},
  marginLeft: {
    marginLeft: '10px',
  },
  header: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
});

function RemoveAction({ removeLabel, fields, index, label }) {
  return removeLabel ? (
    <Button size="small" color="secondary" onClick={() => fields.remove(index)}>
      {`Remove ${label}`}
    </Button>
  ) : (
    <IconButton onClick={() => fields.remove(index)}>
      <Delete />
    </IconButton>
  );
}

function TypeArray({
  fields,
  label,
  typeComponent,
  classes,
  removeLabel,
  hover = true,
  labelStartCase = true,
  maxOccurs = Infinity,
  dense = false,
  withHeader = true,
  direction = 'column',
  arrayHeader = false,
}) {
  const thisLabel = labelStartCase ? startCase(label) : label;
  return (
    <div>
      {arrayHeader && (
        <div className={classes.header}>
          <Typography variant="subtitle2">{thisLabel}</Typography>
          <IconButton onClick={() => fields.push()} size="small" color="primary">
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      )}

      {fields.map((thisField, index) => (
        <div key={`${thisField}`} className={hover ? classes.onHover : classes.noHover}>
          <Grid
            container
            direction="row-reverse"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Grid item sm="auto">
              {direction !== 'row' && (
                <RemoveAction
                  index={index}
                  removeLabel={removeLabel}
                  fields={fields}
                  label={thisLabel}
                />
              )}
            </Grid>
            {withHeader && (
              <Typography variant="subtitle2">{`${thisLabel} ${index + 1}`}</Typography>
            )}
          </Grid>
          {direction === 'row' ? (
            <Grid container direction="row">
              <Grid item sm={11}>
                <FormSection name={`${thisField}`} component={typeComponent} />
              </Grid>
              <Grid item sm="auto">
                <RemoveAction
                  index={index}
                  removeLabel={removeLabel}
                  fields={fields}
                  label={thisLabel}
                />
              </Grid>
            </Grid>
          ) : (
            <div className={dense ? undefined : classes.marginLeft}>
              <FormSection name={`${thisField}`} component={typeComponent} />
            </div>
          )}
        </div>
      ))}
      {/* TODO check when there is no header label */}
      {((fields.length > 0 && fields.length !== maxOccurs) ||
        (arrayHeader === false && fields.length === 0 && fields.length !== maxOccurs)) && (
        <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
          {thisLabel ? `Add ${thisLabel}` : 'Add'}
        </TextButton>
      )}
    </div>
  );
}

function FieldTypeArray({ component, ...props }) {
  return <FieldArray component={TypeArray} typeComponent={component} {...props} />;
}

export default withErrorBoundary(withStyles(hoverStyle)(FieldTypeArray));
