import debounce from 'lodash.debounce';
import { Field } from 'redux-form';

import { taskdefinition as TaskDefinitionApi } from '@vidispine/vdt-api';

import Select from '../ui/Select';

const debouncedListJobType = debounce(TaskDefinitionApi.listJobType, 500, {
  leading: true,
  trailing: false,
});

export const loadJobTypeOptions = async (inputValue) => {
  const { data: uriListType } = await debouncedListJobType();
  const { uri = [] } = uriListType;
  let filterFields = uri;
  if (inputValue && inputValue !== '*') {
    filterFields = uri.filter((f) => f.toLowerCase().includes(inputValue.toLowerCase()));
  }
  const options = filterFields.map((f) => ({ label: f, value: f }));
  return options;
};

const parse = (value) => value?.value;

export default function JobTypeSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadJobTypeOptions}
      cacheOptions
      parse={parse}
      createable
      {...props}
    />
  );
}
