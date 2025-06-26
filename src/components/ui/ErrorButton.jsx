import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const ErrorButton = styled(Button)(({ theme }) => ({
  background: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

export default ErrorButton;
