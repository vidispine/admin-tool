import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import startCase from 'lodash.startcase';

const styles = (theme) => ({
  FormControlLabel: {
    height: theme.typography.subtitle1.lineHeight,
  },
});

function TextGridBoolean({ className, title, value, classes, titleStartCase = true }) {
  return (
    <div className={className}>
      <FormControlLabel
        classes={{ root: classes.FormControlLabel }}
        control={
          <Checkbox
            checked={value === 'true' || value === true}
            indeterminate={value === '' || value === undefined}
            disabled
          />
        }
        label={
          <Typography variant="subtitle2" color="textSecondary">
            {titleStartCase ? startCase(title) : title}
          </Typography>
        }
      />
    </div>
  );
}

export default withStyles(styles)(TextGridBoolean);
