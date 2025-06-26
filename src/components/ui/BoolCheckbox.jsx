import { Checkbox } from '../form';

function BoolCheckbox(props) {
  return (
    <Checkbox
      value={props?.input.checked}
      checked={props?.input.checked}
      onClick={() => props?.input.onChange(!props?.input.checked)}
      indeterminate={props?.input.value === ''}
      {...props}
    />
  );
}

export default BoolCheckbox;
