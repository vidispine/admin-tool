import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from './Main';
import { getBasename } from '../const';

export default function App(props) {
  const { baseUrl } = props;
  const basename = getBasename(baseUrl);
  return (
    <Router basename={basename}>
      <Main {...props} />
    </Router>
  );
}
