import debounce from 'lodash.debounce';
import { Field } from 'redux-form';

import { user as UserApi } from '@vidispine/vdt-api';

import { StatefulAsyncSelect } from '../ui/Select';

const debouncedListUser = debounce(UserApi.listUser, 500, {
  leading: true,
  trailing: false,
});

export const loadUserOptions = async (inputValue) => {
  const { data: userListType } = await debouncedListUser();
  const { user: userList = [] } = userListType;
  let filterUserList = userList;
  if (inputValue && inputValue !== '*') {
    filterUserList = userList.filter((f) =>
      f.userName.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }
  const options = filterUserList.map((f) => ({
    label: f.userName,
    value: f.userName,
  }));
  return options;
};

const parse = (value) => value?.value;

export default function UserSelect(props) {
  return (
    <Field
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      parse={parse}
      createable={false}
      {...props}
    />
  );
}
