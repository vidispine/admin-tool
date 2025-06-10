import MUIStepContent from '@material-ui/core/StepContent';
import { withStyles } from '@material-ui/core/styles';

function StepContent(props) {
  return <MUIStepContent {...props} classes={{ transition: props?.classes?.root }} />;
}

export default withStyles({ root: { overflow: 'visible' } })(StepContent);
