import React from 'react';
import { compose } from 'redux';

import TitleHeader from '../components/ui/TitleHeader';
import FileSearchParams from '../components/file/FileSearchParams';
import FileSearchDocument from '../components/file/FileSearch';
import FileListTable from '../components/file/FileListTable';

import withFormActions from '../hoc/withFormActions';
import withCard from '../hoc/withCard';
import withPaginationForm from '../hoc/withPaginationForm';

const FILE_SEARCH_FORM = 'FILE_SEARCH_FORM';
const FileListTableCard = compose(withCard, withPaginationForm)(FileListTable);

class FileSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSearchSuccess = this.onSearchSuccess.bind(this);
    this.onSetUrlParams = this.onSetUrlParams.bind(this);
    this.onGetUrlParams = this.onGetUrlParams.bind(this);
    const params = this.onGetUrlParams();
    const {
      first = 1,
      number = 10,
      orderBy,
      orderDirection = 'desc',
      ...queryParams
    } = params;
    const sort = orderBy
      ? [{ field: orderBy, order: `${orderDirection}ending` }]
      : [];
    this.initialValues = {
      queryParams: {
        first,
        number,
        ...queryParams,
      },
      fileSearchDocument: {
        sort,
      },
    };
    this.state = {
      fileListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | File';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(FILE_SEARCH_FORM);
  }

  onSearchSuccess(response) {
    const { data: fileListDocument, queryParams } = response;
    this.setState({
      fileListDocument,
      queryParams,
    });
    this.onSetUrlParams(queryParams);
  }

  onSetUrlParams(params) {
    const { location, history } = this.props;
    const urlParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([k, v]) => urlParams.set(k, v));
    history.push({ search: urlParams.toString() });
  }

  onGetUrlParams() {
    const { location } = this.props;
    const urlParams = new URLSearchParams(location.search);
    const params = {};
    Array.from(urlParams).forEach(([k, v]) => {
      params[k] = v;
    });
    return params;
  }

  render() {
    const { fileListDocument, queryParams } = this.state;
    return (
      <>
        <TitleHeader
          title="File"
          helpTo="/ref/search.html#search-files"
          onRefresh={this.onRefresh}
          code={fileListDocument}
          codeModal="FileListDocument"
        />
        <FileSearchDocument
          form={FILE_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <FileSearchParams
          form={FILE_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <FileListTableCard
          fileListDocument={fileListDocument}
          queryParams={queryParams}
          form={FILE_SEARCH_FORM}
          sortField="queryParams.sort"
        />
      </>
    );
  }
}

export default compose(withFormActions)(FileSearch);
