import { PureComponent } from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

export default class StatefulSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      [props.name]: props.initialvalue,
    };
  }

  handleChange(name) {
    return (event) => {
      const { [name]: prevState } = this.state;
      const { onChange } = this.props;
      if (onChange) {
        onChange(event, event.target.value, prevState, name);
      }
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  render() {
    const { children, ValueComponent, label, ...selectProps } = this.props;
    const { name } = this.props;
    const { [name]: value } = this.state;
    const WrappedValueComponent = ValueComponent && ValueComponent(value);
    return (
      <>
        <FormHelperText>{label}</FormHelperText>
        <TextField
          {...selectProps}
          select
          value={value}
          FormHelperTextProps={{ focused: true }}
          onChange={this.handleChange(name)}
        >
          {children}
        </TextField>

        {WrappedValueComponent}
      </>
    );
  }
}
