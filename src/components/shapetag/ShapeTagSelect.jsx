import debounce from 'lodash.debounce';
import { Field } from 'redux-form';

import { shapetag as ShapeTagApi } from '@vidispine/vdt-api';

import Select from '../ui/Select';

const debouncedListShapeTag = debounce(ShapeTagApi.listShapeTag, 500, {
  leading: true,
  trailing: false,
});

export const loadShapeTagOptions = async (inputValue) => {
  const { data: uriListType } = await debouncedListShapeTag();
  const { uri = [] } = uriListType;
  let filterShapeTag = uri;
  if (inputValue && inputValue !== '*') {
    filterShapeTag = uri.filter((f) => f.toLowerCase().includes(inputValue.toLowerCase()));
  }
  const options = filterShapeTag.map((f) => ({ label: f, value: f }));
  return options;
};

const parse = (value) => value?.value;

export default function ShapeTagSelect(props) {
  return (
    <Field
      component={Select}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      parse={parse}
      creatable={false}
      {...props}
    />
  );
}
