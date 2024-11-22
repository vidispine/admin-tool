import React from 'react';
import { Field } from 'redux-form';
import debounce from 'lodash.debounce';

import { storage as StorageApi } from '@vidispine/vdt-api';
import Select from '../ui/Select';

const debounceListStorage = debounce(StorageApi.listStorage, 500, {
  leading: true,
  trailing: false,
});

export const loadStorageOptions = async (inputValue) => {
  const { data: storageListType } = await debounceListStorage();
  const { storage: storageList = [] } = storageListType;
  let filterFields = storageList.map((s) => s.id);
  if (inputValue && inputValue !== '*') {
    filterFields = filterFields.filter((f) => f.toLowerCase().includes(inputValue.toLowerCase()));
  }
  const options = filterFields.map((f) => ({ label: f, value: f }));
  return options;
};

const parse = (value) => value?.value;

export default function StorageSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadStorageOptions}
      cacheOptions
      parse={parse}
      creatable={false}
      {...props}
    />
  );
}
