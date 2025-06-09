import { PureComponent } from 'react';
import { compose } from 'redux';
import TitleHeader from '../components/ui/TitleHeader';
import UriListCard from '../components/ui/UriListCard';

import LibraryListParams, { LIBRARY_LIST_PARAMS_FORM } from '../components/library/LibraryListParams';
import LibraryCreate from '../components/library/LibraryCreate';

import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';

const LIBRARY_CREATE_DIALOG = 'LIBRARY_CREATE_DIALOG';

class LibraryList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      uriListDocument: undefined,
      page: 0,
      rowsPerPage: 100,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Library';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(LIBRARY_LIST_PARAMS_FORM);
  }

  async onChangeRowsPerPage({ target: { value: number } } = {}) {
    const { changeForm } = this.props;
    const first = 1;
    changeForm(LIBRARY_LIST_PARAMS_FORM, 'queryParams.first', first);
    await changeForm(LIBRARY_LIST_PARAMS_FORM, 'queryParams.number', number);
    this.setState({ page: 0, rowsPerPage: number });
    this.onRefresh();
  }

  async onChangePage({ page }) {
    const { rowsPerPage } = this.state;
    const { formValues = {}, changeForm } = this.props;
    const { queryParams = {} } = formValues;
    const { number = rowsPerPage } = queryParams;
    const first = page * number + 1;
    changeForm(LIBRARY_LIST_PARAMS_FORM, 'queryParams.first', first);
    await changeForm(LIBRARY_LIST_PARAMS_FORM, 'queryParams.number', number);
    this.setState({ page, rowsPerPage: number });
    this.onRefresh();
  }

  render() {
    const {
      uriListDocument,
      page,
      rowsPerPage,
    } = this.state;
    const {
      history,
    } = this.props;
    return (
      <>
        <TitleHeader
          title="Library"
          helpTo="/ref/library.html"
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
          createModal={LIBRARY_CREATE_DIALOG}
        />
        <LibraryListParams
          onSuccess={(response) => this.setState({ uriListDocument: response.data })}
          initialValues={{
            queryParams: {
              number: 100,
              first: 1,
            },
          }}
        />
        {uriListDocument && (
          <UriListCard
            uriListDocument={uriListDocument}
            linkTo={(uri) => `/library/${uri}/`}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
          />
        )}
        <LibraryCreate
          dialogName={LIBRARY_CREATE_DIALOG}
          onSuccess={(response) => history.push(`/library/${response.data.uri[0]}/`)}
        />
      </>
    );
  }
}

export default compose(withFormActions, withFormSelectors)(LibraryList, LIBRARY_LIST_PARAMS_FORM);
