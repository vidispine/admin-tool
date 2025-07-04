import { createContext, useReducer, useEffect, useMemo, useContext, useCallback } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import getCookie from '../../utils/getCookie';

import '@fontsource/open-sans';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';

export const DispatchContext = createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

const vsPurple = '#7c74bd';
const vsBlue = '#0068a9';
const vsTeal = '#44a8aa';
const vsTealLight = '#6DC3C5';
const red = '#df5f5f';

export const fontFamily = [
  '"Open Sans"',
  'Helvetica',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

export default function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';
  const [themeOptions, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType || state.paletteType,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, {});
  const { paletteType = preferredMode } = themeOptions;
  useEffect(() => {
    const nextPaletteType = getCookie('paletteType') || preferredMode;
    dispatch({
      type: 'CHANGE',
      payload: { paletteType: nextPaletteType },
    });
  }, [preferredMode]);
  const theme = useMemo(
    () =>
      createTheme({
        overrides: {
          MuiAccordion: {
            root: {
              marginTop: 4,
              marginBottom: 4,
            },
          },
          MuiTablePagination: {
            root: { overflow: 'visible' },
          },
          MuiButton: {
            textSecondary: {
              color: red,
            },
          },
          WAMuiChipInput: {
            root: {
              marginBottom: (props) => (props.helperText ? 20 : undefined),
            },
          },
          MuiFormHelperText: {
            root: {
              fontStyle: 'italic',
              marginBottom: 8,
            },
          },
        },
        props: {
          MuiTextField: {
            InputLabelProps: { shrink: true },
          },
          MuiInputLabel: {
            shrink: true,
          },
          MuiPaper: {
            square: true,
            elevation: 0,
          },
          MuiCard: {
            square: true,
            elevation: 0,
            variant: 'outlined',
          },
          MuiTable: {
            component: 'div',
          },
          MuiTableBody: {
            component: 'div',
          },
          MuiTableCell: {
            component: 'div',
          },
          MuiTableFooter: {
            component: 'div',
          },
          MuiTableHead: {
            component: 'div',
          },
          MuiTablePagination: {
            component: 'div',
          },
          MuiTableRow: {
            component: 'div',
          },
          MuiAccordion: {
            square: true,
            elevation: 0,
          },
          MuiAccordionSummary: {
            expandIcon: <ExpandMoreIcon />,
          },
          WAMuiChipInput: {
            InputLabelProps: {
              shrink: true,
            },
          },
        },
        palette: {
          type: paletteType,
          primary: {
            main: vsBlue,
          },
          secondary: {
            main: vsPurple,
          },
          success: {
            light: vsTealLight,
            main: vsTeal,
          },
          error: {
            main: red,
          },
          background: {
            default: { light: 'rgb(246, 248, 250)', dark: 'rgb(9, 12, 16)' }[paletteType],
            paper: { light: 'rgb(255, 255, 255)', dark: 'rgb(13, 17, 23)' }[paletteType],
          },
          text: {
            primary: {
              light: 'rgba(0, 0, 0, 0.87)',
              dark: 'rgb(201, 209, 217)',
            }[paletteType],
            secondary: {
              light: 'rgba(0, 0, 0, 0.54)',
              dark: 'rgb(139, 148, 158)',
            }[paletteType],
          },
        },
        action: {
          active: { light: 'rgba(0, 0, 0, 0.54)', dark: 'rgb(201, 209, 217)' }[paletteType],
        },
        divider: { light: 'rgba(0, 0, 0, 0.12)', dark: 'rgb(48, 54, 61)' }[paletteType],
        typography: { fontFamily },
      }),
    [paletteType],
  );
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  );
}

export function useChangeTheme() {
  const dispatch = useContext(DispatchContext);
  return useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
