import debounce from 'lodash.debounce';
import { Field } from 'redux-form';

import { projection as ProjectionApi } from '@vidispine/vdt-api';

import { StatefulAsyncSelect } from '../ui/Select';

const debouncedListProjection = debounce(ProjectionApi.listProjection, 500, {
  leading: true,
  trailing: false,
});

export const loadProjectionOptions = async (inputValue) => {
  const { data: uriListType } = await debouncedListProjection();
  const { uri = [] } = uriListType;
  let filterProjection = uri;
  if (inputValue && inputValue !== '*') {
    filterProjection = uri.filter((p) => p.toLowerCase().includes(inputValue.toLowerCase()));
  }
  const options = filterProjection.map((p) => ({ label: p, value: p }));
  return options;
};

const parse = (value) => value?.value;

export default function ProjectionSelect(props) {
  return (
    <Field
      component={StatefulAsyncSelect}
      loadOptions={loadProjectionOptions}
      cacheOptions
      defaultOptions
      parse={parse}
      {...props}
    />
  );
}
