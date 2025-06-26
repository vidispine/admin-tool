import { BrowserRouter as Router } from 'react-router-dom';

import { getBasename } from '../const';

import Main from './Main';

export default function App(props) {
  const { baseURL } = props;
  const basename = getBasename(baseURL);
  return (
    <Router basename={basename}>
      <Main {...props} />
    </Router>
  );
}
