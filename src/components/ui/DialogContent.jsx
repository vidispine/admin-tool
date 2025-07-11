import MUIDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';

function DialogContent(props) {
  return <MUIDialogContent {...props} className={props?.classes?.root} />;
}

export default withStyles({ root: { overflow: 'visible' } })(DialogContent);
