import React from 'react';
import { Field } from 'redux-form';
import debounce from 'lodash.debounce';

import { fieldgroup as FieldGroupApi } from '@vidispine/vdt-api';
import Select from '../ui/Select';

const debouncedListFieldGroup = debounce(FieldGroupApi.listFieldGroup, 500, {
  leading: true,
  trailing: false,
});

export const loadFieldGroupOptions = async (inputValue) => {
  const { data: fieldgroupListType } = await debouncedListFieldGroup();
  const { group = [] } = fieldgroupListType;
  let filterFields = group;
  if (inputValue && inputValue !== '*') {
    filterFields = group.filter((f) => f.name.toLowerCase().includes(inputValue.toLowerCase()));
  }
  const options = filterFields.map((f) => ({ label: f.name, value: f.name }));
  return options;
};

const parse = (value) => value?.value;

export default function FieldGroupSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadFieldGroupOptions}
      cacheOptions
      parse={parse}
      {...props}
    />
  );
}
