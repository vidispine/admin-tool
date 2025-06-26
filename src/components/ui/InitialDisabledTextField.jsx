import { TextField } from '../form';

function InitialDisabledTextField(props) {
  return (
    <TextField
      disabled={props?.meta?.initial !== undefined && props?.meta?.initial !== ''}
      onFocus={props?.onFocus}
      onBlur={props?.onBlur}
      {...props}
    />
  );
}

export default InitialDisabledTextField;
