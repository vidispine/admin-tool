import { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash.debounce';

import fuzzySearch from '../../utils/fuzzySearch';

const DEBOUNCE_WAIT = 150;

/**
 * FilterTextField is a controlled text input component for filtering a list of options using fuzzy search.
 *
 * @param {Object[]} options - The array of options to filter.
 * @param {string|string[]} optionsKey - The key in each option object to use for searching.
 * @param {number} [minScore=0.5] - The minimum fuzzy search score required for an option to be included.
 * @param {Function} onChange - Callback invoked with the filtered options whenever the input value changes.
 * @param {...Object} props - Additional props passed to the underlying TextField component.
 *
 * @returns {JSX.Element} A Material-UI TextField with search and clear functionality.
 */
function FilterTextField({
  options,
  optionsKey,
  minScore = 0.5,
  onChange: onChangeOptions,
  ...props
}) {
  const [value, setValue] = useState('');
  const onFilter = debounce((newValue) => {
    if (newValue === '' || newValue === undefined) {
      onChangeOptions(options);
      return;
    }
    const filterOptions = fuzzySearch(newValue, options, minScore, optionsKey);
    onChangeOptions(filterOptions);
  }, DEBOUNCE_WAIT);
  const onChange = (event) => {
    setValue(event.target.value);
    const newValue = event?.target?.value;
    onFilter(newValue);
  };
  const onReset = () => {
    setValue('');
    onFilter('');
  };

  return (
    <TextField
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton onClick={onReset} onMouseDown={onReset}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
      {...props}
      onChange={onChange}
      value={value}
    />
  );
}

export default FilterTextField;
