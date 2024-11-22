import React from 'react';
import { Field } from 'redux-form';
import debounce from 'lodash.debounce';

import { group as GroupApi } from '@vidispine/vdt-api';
import { StatefulAsyncSelect } from '../ui/Select';

const debouncedListGroup = debounce(GroupApi.listGroup, 500, {
  leading: true,
  trailing: false,
});

export const loadGroupOptions = async (inputValue) => {
  const { data: groupListType } = await debouncedListGroup();
  const { group = [] } = groupListType;
  let filterOps = group;
  if (inputValue && inputValue !== '*') { filterOps = group.filter((f) => f.groupName.toLowerCase().includes(inputValue.toLowerCase())); }
  const options = filterOps.map((f) => ({
    label: f.groupName,
    value: f.groupName,
  }));
  return options;
};

const parse = (value) => value?.value;

export default function GroupSelect(props) {
  return (
    <Field
      component={StatefulAsyncSelect}
      loadOptions={loadGroupOptions}
      cacheOptions
      parse={parse}
      {...props}
    />
  );
}
