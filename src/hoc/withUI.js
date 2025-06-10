import { compose } from 'redux';

import { withModalNoRouter } from './withModal';
import { withRouterProps } from './withRouterProps';
import { withSnackbarNoRouter } from './withSnackbar';

export default compose(withModalNoRouter, withSnackbarNoRouter, withRouterProps);
