import { createMemoryHistory as createHistory } from 'history';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ThemeProvider from './components/ui/Theme';
import configureStore from './configureStore';
import { App, Login } from './containers';
import Auth from './containers/Auth';

const history = createHistory();
const store = configureStore({ history });

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Auth loginComponent={Login} appComponent={App} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
