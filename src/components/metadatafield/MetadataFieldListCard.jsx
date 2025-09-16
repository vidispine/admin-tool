import { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FilterTextField from '../ui/FilterTextField';

import MetadataFieldListTable from './MetadataFieldListTable';

export default function MetadataFieldListCard({ metadataFieldListDocument, ...props }) {
  const options = metadataFieldListDocument?.field || [];
  const [filter, setFilter] = useState(options);
  const filterMetadataFieldListDocument = { ...metadataFieldListDocument, field: filter };
  return (
    <Card>
      <CardContent>
        <FilterTextField
          variant="outlined"
          fullWidth
          options={options}
          onChange={setFilter}
          optionsKey={['name', 'type']}
          minScore={0.5}
        />
        <MetadataFieldListTable
          metadataFieldListDocument={filterMetadataFieldListDocument}
          {...props}
        />
      </CardContent>
    </Card>
  );
}
