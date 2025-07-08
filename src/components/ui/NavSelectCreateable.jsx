import { useCallback } from 'react';

import { useTheme } from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';

import { styles, MultiValueRemove, ClearIndicator, DropdownIndicator } from './Select';

function NavSelectCreateable({ input, meta, components = {}, ...props }) {
  const { palette, typography } = useTheme();
  const theme = useCallback(
    (selectTheme) => ({
      ...selectTheme,
      borderRadius: 0,
      spacing: {
        ...selectTheme.spacing,
        menuGutter: 0,
      },
      colors: {
        ...selectTheme.colors,
        primary: palette.text.primary,
      },
      fontFamily: typography.fontFamily,
    }),
    [palette, typography],
  );
  return (
    <CreatableSelect
      {...input}
      {...props}
      components={{
        MultiValueRemove,
        ClearIndicator,
        DropdownIndicator,
        ...components,
      }}
      palette={palette}
      typography={typography}
      styles={styles}
      placeholder={props.label}
      theme={theme}
    />
  );
}

export default NavSelectCreateable;
