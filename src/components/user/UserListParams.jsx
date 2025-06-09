import * as formActions from '../../formactions/user';
import FormWrapper from '../ui/FormWrapper';
import UserListParamsForm from './UserListParamsForm';
import UserListSearchForm from './UserListSearchForm';

export const USER_LIST_PARAMS_FORM = 'USER_LIST_PARAMS_FORM';

function UserListParams({ number, first, ...props }) {
  return (
    <FormWrapper
      form={USER_LIST_PARAMS_FORM}
      formAction={formActions.onSearchUser}
      FormComponent={[UserListParamsForm, UserListSearchForm]}
      title="User List Params"
      initialValues={{ queryParams: { number, first } }}
      {...props}
    />
  );
}

export default UserListParams;
