import { BrowserRouter as Router } from 'react-router-dom';

import { getBasename } from '../const';

import Main from './Main';

export default function App(props) {
  const { baseUrl } = props;
  const basename = getBasename(baseUrl);
  return (
    <Router basename={basename}>
      <Main {...props} />
    </Router>
  );
}
