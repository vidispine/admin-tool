import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EssenceVersionList from './EssenceVersionList';
import EssenceVersion from './EssenceVersion';

function ItemVersion({ titleComponent }) {
  return (
    <Switch>
      <Route
        exact
        path="/item/:itemId/version/:versionId"
        render={() => <EssenceVersion titleComponent={titleComponent} />}
      />
      <Route
        exact
        path="/item/:itemId/version/"
        render={() => <EssenceVersionList titleComponent={titleComponent} />}
      />
    </Switch>
  );
}

export default ItemVersion;
