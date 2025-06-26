import { withStyles, Typography } from '@material-ui/core';

const styles = () => ({
  logo: {
    text: '100%',
    textAlign: 'center',
  },
});

function NotFound({ classes }) {
  return <Typography className={classes.text}>Page does not exist</Typography>;
}

export default withStyles(styles)(NotFound);
