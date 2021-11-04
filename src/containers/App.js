import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './Main';
import { getBasename } from '../const';

export default function App(props) {
  const { baseUrl } = props;
  const basename = getBasename(baseUrl);
  return (
    <BrowserRouter basename={basename}>
      <Route
        path="/"
        render={() => (<Main {...props} />)}
      />
    </BrowserRouter>
  );
}
