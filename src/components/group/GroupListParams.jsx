import * as formActions from '../../formactions/group';
import FormWrapper from '../ui/FormWrapper';
import GroupListParamsForm from './GroupListParamsForm';
import GroupListSearchForm from './GroupListSearchForm';

export const GROUP_LIST_PARAMS_FORM = 'GROUP_LIST_PARAMS_FORM';

function GroupListParam({ number, first, ...props }) {
  return (
    <FormWrapper
      form={GROUP_LIST_PARAMS_FORM}
      formAction={formActions.onSearchGroup}
      FormComponent={[GroupListParamsForm, GroupListSearchForm]}
      title="Group List Params"
      initialValues={{ queryParams: { number, first } }}
      {...props}
    />
  );
}

export default GroupListParam;
