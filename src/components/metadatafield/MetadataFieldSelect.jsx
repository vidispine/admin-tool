import debounce from 'lodash.debounce';
import { Field } from 'redux-form';

import { metadatafield as MetadataFieldApi } from '@vidispine/vdt-api';

import Select from '../ui/Select';

const TRANSIENT_FIELDS = [
  { name: '__user' },
  { name: '__collection' },
  { name: '__collection_size' },
  { name: '__ancestor_collection' },
  { name: '__ancestor_collection_size' },
  { name: '__shape' },
  { name: '__shape_size' },
  { name: '__shape_last_added' },
  { name: '__placeholder_shape_size' },
  { name: '__version' },
  { name: '__version_size' },
  { name: '__storage' },
  { name: '__storage_size' },
  { name: '__storagegroup' },
  { name: '__storagegroup_size' },
  { name: '__sequence' },
  { name: '__sequence_size' },
  { name: '__metadata_last_modified' },
  { name: '____metadataFieldGroup' },
  { name: '__externalId' },
  { name: '__child_collection' },
  { name: '__child_collection_size' },
  { name: '__parent_collection' },
  { name: '__parent_collection_size' },
  { name: '__items_size' },
  { name: '__folder_mapped' },
  { name: '__child_folder_collection' },
  { name: '__parent_folder_collection' },
  { name: '__parent_folder_collection' },
  { name: '__deletion_lock_expiry' },
];

const debouncedListMetadataField = debounce(MetadataFieldApi.listMetadataField, 500, {
  leading: true,
  trailing: false,
});

export const loadMetadataFieldOptions = async (inputValue) => {
  const { data: fieldListType } = await debouncedListMetadataField();
  const { field = [] } = fieldListType;
  const fieldList = field.concat(TRANSIENT_FIELDS);
  let filterFields = fieldList;
  if (inputValue && inputValue !== '*') {
    const inputValueLower = inputValue.toLowerCase();
    filterFields = fieldList.filter((f) => f.name.toLowerCase().includes(inputValueLower));
  }
  const options = filterFields.map((f) => ({
    label: f.name,
    value: f.name,
  }));
  return options;
};

const parse = (value) => value?.value;

export default function MetadataFieldSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadMetadataFieldOptions}
      cacheOptions
      parse={parse}
      {...props}
    />
  );
}
