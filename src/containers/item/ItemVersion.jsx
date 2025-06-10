import { Route, Switch } from 'react-router-dom';

import EssenceVersion from './EssenceVersion';
import EssenceVersionList from './EssenceVersionList';

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
