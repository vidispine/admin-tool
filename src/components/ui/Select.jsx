// eslint-disable-next-line max-classes-per-file
import { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import { withTheme, alpha } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ClearIcon from '@material-ui/icons/Clear';
import Select, { components as SelectComponents } from 'react-select';
import Async from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { change } from 'redux-form';

export const styles = {
  container: (base, state) => ({
    ...base,
    fontSize: state?.selectProps?.typography?.htmlFontSize,
    color: state.isDisabled ? state.selectProps.palette.text.disabled : 'inherit',
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: 0,
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: state.selectProps.palette.selected,
    borderRadius: '0',
    borderWidth: state.selectProps.variant === 'outlined' ? '1px 1px 1px 1px' : '0 0 1px 0',
    boxShadow: 'none',
    borderColor:
      state.selectProps.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.42)'
        : 'rgba(255, 255, 255, 0.7)',
    color: state.isDisabled ? state.selectProps.palette.text.disabled : 'inherit',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '2px',
  }),
  indicatorsContainer: (base, state) => ({
    ...base,
    color: 'inherit',
    visibility: state.isDisabled ? 'hidden' : undefined,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    background: 'inherit',
  }),
  input: (base, state) => ({
    ...base,
    color: state.isDisabled ? state.selectProps.palette.text.disabled : 'inherit',
    visibility: state.isDisabled ? 'visible' : undefined,
  }),
  menu: (base, state) => ({
    ...base,
    backgroundColor: state.selectProps.palette.background.paper,
    borderRadius: '0px',
    zIndex: 1500,
  }),
  option: (base, state) => ({
    ...base,
    color: state.selectProps.palette.text.primary,
    backgroundColor: state.isFocused // eslint-disable-line no-nested-ternary
      ? state.selectProps.palette.action.focus
      : state.isSelected
        ? state.selectProps.palette.action.focus.selected
        : state.selectProps.palette.action.focus.hover,
  }),
  placeholder: (base) => ({
    ...base,
    paddingLeft: 4,
    lineHeight: 1,
  }),
  singleValue: (base) => ({
    ...base,
    height: 32,
  }),
  singleValueLabel: (base, state) => {
    const { palette } = state.selectProps;
    const backgroundColor = palette.type === 'light' ? palette.grey[300] : palette.grey[700];
    const color = palette.getContrastText(backgroundColor);
    return {
      ...base,
      color,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 8,
      paddingRight: 8,
    };
  },
  multiValue: (base, state) => {
    const { palette } = state.selectProps;
    const backgroundColor = palette.type === 'light' ? palette.grey[300] : palette.grey[700];
    return {
      ...base,
      borderRadius: 32 / 2,
      height: 32,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
    };
  },
  multiValueLabel: (base, state) => {
    const { palette } = state.selectProps;
    const backgroundColor = palette.type === 'light' ? palette.grey[300] : palette.grey[700];
    const color = palette.getContrastText(backgroundColor);
    return {
      ...base,
      paddingLeft: 8,
      paddingRight: 8,
      color,
    };
  },
  multiValueRemove: (base, state) => {
    const { palette } = state.selectProps;
    const deleteIconColor = alpha(palette.text.primary, 0.26);
    return {
      ...base,
      color: deleteIconColor,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      ':hover': {
        color: alpha(deleteIconColor, 0.4),
      },
    };
  },
};

export function MultiValueRemove(props) {
  return (
    <SelectComponents.MultiValueRemove {...props}>
      <CancelIcon />
    </SelectComponents.MultiValueRemove>
  );
}

export function ClearIndicator(props) {
  return (
    <SelectComponents.ClearIndicator {...props}>
      <ClearIcon />
    </SelectComponents.ClearIndicator>
  );
}
export function DropdownIndicator(props) {
  return (
    <SelectComponents.DropdownIndicator {...props}>
      <ArrowDropDownIcon />
    </SelectComponents.DropdownIndicator>
  );
}

class UnThemedStatefulAsyncSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.theme = this.theme.bind(this);
    const { input: { value } = {} } = this.props;
    const { optionLabelKey = 'label', optionValueKey = 'value', isMulti } = props;
    let valueOption;
    let inputValue;
    if (isMulti && value) {
      let valueList = value;
      if (!Array.isArray(value)) {
        valueList = value.split(',');
      }
      valueOption = valueList.map((v) => ({ [optionLabelKey]: v, [optionValueKey]: v }));
    } else {
      valueOption = value && { [optionLabelKey]: value, [optionValueKey]: value };
      inputValue = value;
    }
    this.state = {
      inputValue,
      valueOption,
    };
  }

  handleUpdate(inputValue) {
    this.setState({ inputValue });
  }

  handleChange(valueOption) {
    const {
      input: { name, onChange },
      meta: { dispatch, form },
      optionValueKey = 'value',
      isMulti,
      multiResetToArray = false,
    } = this.props;
    let value = '';
    if (valueOption) {
      if (isMulti) {
        if (valueOption.length > 0) {
          value = valueOption.map((v) => v[optionValueKey]);
        } else {
          value = multiResetToArray ? [] : '';
          this.handleInputChange(value); // fire when clearing value
        }
      } else {
        value = valueOption[optionValueKey];
      }
    } else {
      this.handleInputChange(value); // fire when clearing value
    }
    this.setState({ valueOption });
    onChange(value);
    if (dispatch) {
      // Prefer dispatch as more reliable
      dispatch(change(form, name, value));
    }
  }

  handleInputChange(inputValue) {
    const { isMulti } = this.props;
    if (isMulti) {
      if (inputValue.length === 0) {
        this.setState({ inputValue: undefined }); // errors if set to empty array
        return;
      }
    }
    this.setState({ inputValue });
  }

  theme(selectTheme) {
    const { theme } = this.props;
    const { typography } = theme;
    return {
      typography,
      ...selectTheme,
      borderRadius: 0,
      spacing: {
        ...selectTheme.spacing,
        menuGutter: 0,
      },
      colors: {
        ...selectTheme.colors,
        primary: theme.palette.text.primary,
      },
      fontFamily: typography.fontFamily,
    };
  }

  render() {
    const { input = {}, meta = {}, theme, components = {}, ...props } = this.props;
    const { palette, typography } = theme;
    const {
      optionLabelKey = 'label',
      optionValueKey = 'value',
      creatable = false,
      getOptionLabel = (option) => option[optionLabelKey],
      getOptionValue = (option) => option[optionValueKey],
      loadOptions,
      disableInitial,
      isDisabled: isDisabledProp,
      InputLabelProps = {},
      placeholder = '',
    } = props;
    const { valueOption, inputValue } = this.state;
    let isDisabled = isDisabledProp;
    if (disableInitial) {
      isDisabled = meta.initial !== undefined && meta.initial !== '';
    }
    let ThisSelect = Select;
    if (loadOptions) {
      ThisSelect = creatable ? AsyncCreatableSelect : Async;
    }
    return (
      <>
        {props.label && (
          <InputLabel required={props.required} {...InputLabelProps}>
            {props.label}
          </InputLabel>
        )}
        <ThisSelect
          {...props}
          {...input}
          components={{
            MultiValueRemove,
            ClearIndicator,
            DropdownIndicator,
            ...components,
          }}
          id={input.name}
          styles={styles}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          value={valueOption}
          inputValue={inputValue}
          onInputChange={this.handleInputChange}
          onChange={this.handleChange}
          placeholder={placeholder}
          onBlur={() => true}
          onFocus={() => true}
          isDisabled={isDisabled}
          palette={palette}
          typography={typography}
          theme={this.theme}
        />
      </>
    );
  }
}

export const StatefulAsyncSelect = withTheme(UnThemedStatefulAsyncSelect);

export default StatefulAsyncSelect;
