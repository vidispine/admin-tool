import { withStyles } from '@material-ui/core/styles';
import MUITable from '@material-ui/core/Table';

function Table(props) {
  return <MUITable {...props} className={props?.classes?.root} />;
}

export default withStyles({ root: { tableLayout: 'fixed' } })(Table);
