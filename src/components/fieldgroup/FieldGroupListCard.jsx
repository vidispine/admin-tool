import { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FilterTextField from '../ui/FilterTextField';

import FieldGroupListTable from './FieldGroupListTable';

export default function FieldGroupListCard({ metadataFieldGroupListDocument, ...props }) {
  const options = metadataFieldGroupListDocument?.group || [];
  const [filter, setFilter] = useState(options);
  const filterMetadataFieldGroupListDocument = { ...metadataFieldGroupListDocument, group: filter };
  return (
    <Card>
      <CardContent>
        <FilterTextField
          variant="outlined"
          fullWidth
          options={options}
          onChange={setFilter}
          optionsKey="name"
          minScore={0.5}
        />
        <FieldGroupListTable
          metadataFieldGroupListDocument={filterMetadataFieldGroupListDocument}
          {...props}
        />
      </CardContent>
    </Card>
  );
}
