import { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FilterTextField from '../ui/FilterTextField';
import UriListTable from '../ui/UriListTable';

export default function ShapeTagListCard({ uriListDocument }) {
  const linkTo = (uri) => `/shape-tag/${uri}/`;
  const options = uriListDocument?.uri || [];
  const [filter, setFilter] = useState(options);
  const filterUriListDocument = { ...uriListDocument, uri: filter };
  return (
    <Card>
      <CardContent>
        <FilterTextField
          variant="outlined"
          fullWidth
          options={options}
          onChange={setFilter}
          minScore={0.5}
        />

        <UriListTable uriListDocument={filterUriListDocument} linkTo={linkTo} />
      </CardContent>
    </Card>
  );
}
