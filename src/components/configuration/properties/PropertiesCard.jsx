import { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FilterTextField from '../../ui/FilterTextField';

import PropertiesTable from './PropertiesTable';

export default function PropertiesCard({ configurationPropertyListDocument, ...props }) {
  const options = configurationPropertyListDocument?.property || [];
  const [filter, setFilter] = useState(options);
  const filterConfigurationPropertyListDocument = {
    ...configurationPropertyListDocument,
    property: filter,
  };
  return (
    <Card>
      <CardContent>
        <FilterTextField
          variant="outlined"
          fullWidth
          options={options}
          onChange={setFilter}
          optionsKey="key"
          minScore={0.5}
        />

        <PropertiesTable
          configurationPropertyListDocument={filterConfigurationPropertyListDocument}
          {...props}
        />
      </CardContent>
    </Card>
  );
}
