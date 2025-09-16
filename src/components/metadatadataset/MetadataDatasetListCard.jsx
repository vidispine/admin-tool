import { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FilterTextField from '../ui/FilterTextField';

import MetadataDatasetListTable from './MetadataDatasetListTable';

export default function MetadataDatasetListCard({ metadataDatasetListDocument, ...props }) {
  const options = metadataDatasetListDocument?.dataset || [];
  const [filter, setFilter] = useState(options);
  const filterMetadataDatasetListDocument = { ...metadataDatasetListDocument, dataset: filter };
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

        <MetadataDatasetListTable
          metadataDatasetListDocument={filterMetadataDatasetListDocument}
          {...props}
        />
      </CardContent>
    </Card>
  );
}
