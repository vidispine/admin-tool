import React from 'react';
import { compose } from 'redux';

import FileListTitle from '../components/file/FileListTitle';
import FileListFilter from '../components/file/FileListFilter';
import FilePrefixCard from '../components/file/FilePrefixCard';
import FileListTable from '../components/file/FileListTable';
import FileEntity from '../components/file/FileEntity';
import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';
import withCard from '../hoc/withCard';
import withPaginationForm from '../hoc/withPaginationForm';

const FileListTableCard = compose(withCard, withPaginationForm)(FileListTable);

const FILE_FILTER_FORM = 'FILE_FILTER_FORM';
const FILE_ENTITY_DIALOG = 'FILE_ENTITY_DIALOG';

class FileList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onSetUrlParams = this.onSetUrlParams.bind(this);
    this.onGetUrlParams = this.onGetUrlParams.bind(this);
    this.onChangePrefix = this.onChangePrefix.bind(this);
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
    submitForm(FILE_FILTER_FORM);
  }

  onSuccess(response) {
    const { data: fileListDocument, queryParams } = response;
    this.setState({
      fileListDocument,
      queryParams,
    });
    this.onSetUrlParams(queryParams);
  }

  async onChangePrefix(prefix) {
    const { changeForm } = this.props;
    await changeForm(FILE_FILTER_FORM, 'queryParams.path', prefix);
    this.onRefresh();
  }

  onSetUrlParams(params) {
    console.log({ params });
    if (params === undefined) return;
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
    const { history } = this.props;
    return (
      <>
        <FileListTitle
          code={fileListDocument}
          codeModal="FileListDocument"
          createModal={FILE_ENTITY_DIALOG}
          onRefresh={this.onRefresh}
        />
        <FileListFilter form={FILE_FILTER_FORM} onSuccess={this.onSuccess} />
        {fileListDocument && (
          <>
            {fileListDocument.prefixes && (
              <FilePrefixCard
                filePrefixType={fileListDocument.prefixes}
                onChangePrefix={this.onChangePrefix}
              />
            )}
            <FileListTableCard
              fileListDocument={fileListDocument}
              queryParams={queryParams}
              form={FILE_FILTER_FORM}
              sortField="queryParams.sort"
            />
          </>
        )}
        <FileEntity
          dialogName={FILE_ENTITY_DIALOG}
          onSuccess={(response) => history.push(`/file/${response.data.id}`)}
        />
      </>
    );
  }
}

export default compose(withFormActions, withFormSelectors)(FileList, FILE_FILTER_FORM);
