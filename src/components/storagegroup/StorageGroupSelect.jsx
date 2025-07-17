import debounce from 'lodash.debounce';
import { Field } from 'redux-form';

import { storage as StorageApi } from '@vidispine/vdt-api';

import Select from '../ui/Select';

const debouncedListStorage = debounce(StorageApi.listStorage, 500, {
  leading: true,
  trailing: false,
});

export const loadStorageGroupOptions = async (inputValue) => {
  const { data: storageGroupListType } = await debouncedListStorage();
  const { group: groupList = [] } = storageGroupListType;
  let filterStorageGroup = groupList.map((s) => s.name);
  if (inputValue && inputValue !== '*') {
    filterStorageGroup = filterStorageGroup.filter((f) =>
      f.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }
  const options = filterStorageGroup.map((f) => ({ label: f, value: f }));
  return options;
};

const parse = (value) => value?.value;

export default function StorageGroupSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadStorageGroupOptions}
      cacheOptions
      parse={parse}
      createable
      {...props}
    />
  );
}
