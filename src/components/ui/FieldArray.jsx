import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import startCase from 'lodash.startcase';
import { FieldArray as RXFieldArray, Field } from 'redux-form';

import withErrorBoundary from '../../hoc/withErrorBoundary';

import TextButton from './TextButton';

const hoverStyle = (theme) => ({
  onHover: {
    paddingTop: '10px',
    paddingBottom: '10px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  noHover: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  marginLeft: {
    marginLeft: '10px',
  },
});

function FieldArrayComponent({
  fields,
  label,
  classes,
  hover = true,
  labelStartCase = true,
  fieldComponent,
  ...props
}) {
  return (
    <div>
      {fields.map((thisField, index) => (
        <div key={thisField} className={hover ? classes.onHover : classes.noHover}>
          <Grid
            container
            direction="row-reverse"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Grid item sm="auto">
              <IconButton onClick={() => fields.remove(index)}>
                <Delete />
              </IconButton>
            </Grid>
            {label && (
              <Typography variant="subtitle2">
                {labelStartCase ? startCase(`${label} ${index + 1}`) : `${label} ${index + 1}`}
              </Typography>
            )}
          </Grid>
          <div className={classes.marginLeft}>
            <Field name={`${thisField}`} component={fieldComponent} {...props} />
          </div>
        </div>
      ))}
      <TextButton onClick={() => fields.push()} color="primary" style={{ marginTop: 10 }}>
        {label ? `Add ${label}` : 'Add'}
      </TextButton>
    </div>
  );
}

function FieldArray({ component, ...props }) {
  const StyledFieldArrayComponent = withStyles(hoverStyle)(FieldArrayComponent);
  return (
    <RXFieldArray component={StyledFieldArrayComponent} fieldComponent={component} {...props} />
  );
}

export default withErrorBoundary(FieldArray);
