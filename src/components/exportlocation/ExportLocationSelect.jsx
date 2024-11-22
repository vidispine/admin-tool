import React from 'react';
import { Field } from 'redux-form';
import debounce from 'lodash.debounce';

import { exportlocation as ExportLocationApi } from '@vidispine/vdt-api';
import Select from '../ui/Select';

const debounceListExportLocation = debounce(
  ExportLocationApi.listExportLocation,
  500,
  { leading: true, trailing: false },
);

export const loadExportLocationOptions = async (inputValue) => {
  const { data: exportLocationListType } = await debounceListExportLocation();
  const { exportLocation = [] } = exportLocationListType;
  let filterExportLocation = exportLocation;
  if (inputValue && inputValue !== '*') {
    filterExportLocation = exportLocation
      .filter((f) => f.name.toLowerCase().includes(inputValue.toLowerCase()));
  }
  const options = filterExportLocation.map((f) => ({
    label: f.name,
    value: f.name,
  }));
  return options;
};

const parse = (value) => value?.value;

export default function ExportLocationSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadExportLocationOptions}
      cacheOptions
      parse={parse}
      {...props}
    />
  );
}
