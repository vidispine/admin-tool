import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    padding: 'unset',
    minWidth: 'unset',
  },
};

function TextButton({ classes, children, ...props }) {
  return (
    <Button className={classes.button} disableFocusRipple disableRipple {...props}>
      {children}
    </Button>
  );
}

export default withStyles(styles)(TextButton);
