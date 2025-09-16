import { PureComponent } from 'react';

import { compose } from 'redux';

import GroupListCard from '../components/group/GroupListCard';
import GroupListParams, { GROUP_LIST_PARAMS_FORM } from '../components/group/GroupListParams';
import GroupListTitle from '../components/group/GroupListTitle';
import GroupWizard from '../components/group/GroupWizard';
import routes from '../const/routes';
import withFormActions from '../hoc/withFormActions';
import withUI from '../hoc/withUI';

const GROUP_CREATE_MODAL = 'GROUP_CREATE_MODAL';

class GroupList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.state = {
      groupListDocument: undefined,
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Group';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(GROUP_LIST_PARAMS_FORM);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Group List';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  async onChangeRowsPerPage({ target: { value: rowsPerPage } } = {}) {
    const { changeForm } = this.props;
    const page = 0;
    const first = page * rowsPerPage + 1;
    await changeForm(GROUP_LIST_PARAMS_FORM, 'queryParams.first', first);
    await changeForm(GROUP_LIST_PARAMS_FORM, 'queryParams.number', rowsPerPage);
    await this.setState({ page, rowsPerPage });
    this.onRefresh();
  }

  async onChangePage({ page }) {
    const { changeForm } = this.props;
    const { rowsPerPage } = this.state;
    const first = page * rowsPerPage + 1;
    await changeForm(GROUP_LIST_PARAMS_FORM, 'queryParams.first', first);
    await this.setState({ page });
    this.onRefresh();
  }

  render() {
    const { groupListDocument, rowsPerPage, page } = this.state;
    const { history } = this.props;
    const first = page * rowsPerPage + 1;
    return (
      <>
        <GroupListTitle
          createModal={GROUP_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={groupListDocument}
          codeModal="GroupListDocument"
        />
        <GroupListParams
          number={rowsPerPage}
          first={first}
          onSuccess={(response) => this.setState({ groupListDocument: response.data })}
        />

        {groupListDocument && (
          <GroupListCard
            groupListDocument={groupListDocument}
            onRefresh={this.onRefresh}
            first={first}
            rowsPerPage={rowsPerPage}
            count={groupListDocument.hits}
            onChangePage={this.onChangePage}
            page={page}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
          />
        )}
        <GroupWizard
          dialogName={GROUP_CREATE_MODAL}
          onSuccess={({ data }) => history.push(routes.group({ groupName: data.groupName }))}
        />
      </>
    );
  }
}

export default compose(withFormActions, withUI)(GroupList);
