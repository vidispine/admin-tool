import React from 'react';
import { Field } from 'redux-form';
import debounce from 'lodash.debounce';

import { user as api } from '@vidispine/vdt-api';
import { StatefulAsyncSelect } from '../ui/Select';

// eslint-disable-next-line no-underscore-dangle
const _listUser = debounce(api.listUser, 500, { leading: true, trailing: false });

export const loadUserOptions = (inputValue) => new Promise((resolve, reject) => {
  _listUser()
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((jsonDocument) => {
      const { user = [] } = jsonDocument;
      let filterOps = user;
      if (inputValue && inputValue !== '*') {
        filterOps = user.filter((f) => f.userName.toLowerCase().includes(inputValue.toLowerCase()));
      }
      const options = filterOps.map((f) => ({ label: f.userName, value: f.userName }));
      resolve(options);
    })
    .catch((error) => {
      reject(error);
    });
});

const parse = (value) => {
  if (value) {
    return value.value;
  }
  return undefined;
};

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
