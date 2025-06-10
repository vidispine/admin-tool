import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import withUI from '../../hoc/withUI';

import CodeDisplay from './CodeDisplay';

function CodeModal({ code, variant, title, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      {open && (
        <>
          <DialogTitle>{title || ''}</DialogTitle>
          <DialogContent>
            <CodeDisplay code={code} variant={variant} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default withUI(CodeModal);
