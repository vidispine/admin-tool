import React from 'react';
import { compose } from 'redux';

import withFormActions from '../hoc/withFormActions';
import withUI from '../hoc/withUI';

import UserListTitle from '../components/user/UserListTitle';
import UserListCard from '../components/user/UserListCard';
import UserWizard from '../components/user/UserWizard';
import UserListParams, {
  USER_LIST_PARAMS_FORM,
} from '../components/user/UserListParams';

const USER_CREATE_MODAL = 'USER_CREATE_MODAL';

class UserList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.state = {
      userListDocument: undefined,
      page: 0,
      rowsPerPage: 100,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | User';
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(USER_LIST_PARAMS_FORM);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading User List';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  async onChangeRowsPerPage({ target: { value: rowsPerPage } } = {}) {
    const { changeForm } = this.props;
    const page = 0;
    const first = page * rowsPerPage + 1;
    await changeForm(USER_LIST_PARAMS_FORM, 'queryParams.first', first);
    await changeForm(USER_LIST_PARAMS_FORM, 'queryParams.number', rowsPerPage);
    await this.setState({ page, rowsPerPage });
    this.onRefresh();
  }

  async onChangePage({ page }) {
    const { changeForm } = this.props;
    const { rowsPerPage } = this.state;
    const first = page * rowsPerPage + 1;
    await changeForm(USER_LIST_PARAMS_FORM, 'queryParams.first', first);
    await this.setState({ page });
    this.onRefresh();
  }

  render() {
    const { userListDocument, rowsPerPage, page } = this.state;
    const { history } = this.props;
    const first = page * rowsPerPage + 1;
    return (
      <>
        <UserListTitle
          createModal={USER_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={userListDocument}
          codeModal="UserListDocument"
        />
        <UserListParams
          number={rowsPerPage}
          first={first}
          onSuccess={(response) => this.setState({ userListDocument: response.data })}
        />
        {userListDocument && (
          <UserListCard
            userListDocument={userListDocument}
            onRefresh={this.onRefresh}
            first={first}
            rowsPerPage={rowsPerPage}
            count={userListDocument.hits}
            onChangePage={this.onChangePage}
            page={page}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
          />
        )}
        <UserWizard
          dialogName={USER_CREATE_MODAL}
          onSuccess={(response) => history.push(`/user/${response.data.userName}`)}
        />
      </>
    );
  }
}

export default compose(withFormActions, withUI)(UserList);
