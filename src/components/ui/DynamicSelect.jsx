import { PureComponent } from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import update from 'immutability-helper';

export default class DynamicSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    const { meta, choices = {} } = props;
    const { initial = {} } = meta;
    const initialvalue = Object.keys(choices).find((c) => Object.keys(initial).includes(c));
    this.state = {
      value: initialvalue || '',
    };
  }

  handleChange(event) {
    const { value: newState } = event.target;
    const { value: prevState } = this.state;
    const { input } = this.props;
    const { value: prevValue, onChange } = input;
    if (prevValue) {
      const newValue = update(prevValue, {
        [newState]: {
          $set: '',
        },
        $unset: [prevState],
      });
      onChange(newValue);
    } else {
      onChange({ [newState]: '' });
    }
    this.setState({
      value: newState,
    });
  }

  render() {
    const { children, label, choices = {}, input, ...selectProps } = this.props;
    const { value } = this.state;
    const ChoiceComponent = value ? choices[value] : null;
    return (
      <>
        <FormHelperText>{label}</FormHelperText>
        <TextField
          {...selectProps}
          select
          value={value}
          FormHelperTextProps={{ focused: true }}
          onChange={this.handleChange}
        >
          {children}
        </TextField>
        {ChoiceComponent}
      </>
    );
  }
}
