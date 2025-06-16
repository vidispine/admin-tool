import { PureComponent } from 'react';

import { compose } from 'redux';

import FileEntity from '../components/file/FileEntity';
import FileListFilter from '../components/file/FileListFilter';
import FileListTable from '../components/file/FileListTable';
import FileListTitle from '../components/file/FileListTitle';
import FilePrefixCard from '../components/file/FilePrefixCard';
import withCard from '../hoc/withCard';
import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';
import withPaginationForm from '../hoc/withPaginationForm';
import withUI from '../hoc/withUI';

const FileListTableCard = compose(withCard, withPaginationForm)(FileListTable);

const FILE_FILTER_FORM = 'FILE_FILTER_FORM';
const FILE_ENTITY_DIALOG = 'FILE_ENTITY_DIALOG';

class FileList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onSetUrlParams = this.onSetUrlParams.bind(this);
    this.onGetUrlParams = this.onGetUrlParams.bind(this);
    this.onChangePrefix = this.onChangePrefix.bind(this);
    const params = this.onGetUrlParams();
    const { first = 1, number = 10, orderBy, orderDirection = 'desc', ...queryParams } = params;
    const sort = orderBy ? [{ field: orderBy, order: `${orderDirection}ending` }] : [];
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
    const { storageId } = this.props;
    document.title = storageId
      ? `VidiCore Admin | Storage | ${storageId} | File`
      : 'VidiCore Admin | File';
    this.onRefresh();
  }

  async UNSAFE_componentWillReceiveProps({ storageId }) {
    if (!storageId) return;
    const { storageId: prevStorageId, changeForm } = this.props;
    if (prevStorageId !== storageId) {
      await changeForm(FILE_FILTER_FORM, 'storageId', storageId);
      this.onRefresh();
      document.title = `VidiCore Admin | Storage | ${storageId} | File`;
    }
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
    const {
      storageId,
      history,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    return (
      <>
        {TitleComponent ? (
          <TitleComponent
            code={fileListDocument}
            codeModal="FileListDocument"
            onRefresh={this.onRefresh}
            createModal={FILE_ENTITY_DIALOG}
            iconList={null}
            removeModal={null}
            title="File"
          />
        ) : (
          <FileListTitle
            code={fileListDocument}
            codeModal="FileListDocument"
            createModal={FILE_ENTITY_DIALOG}
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && <TabComponent />}

        <FileListFilter
          form={FILE_FILTER_FORM}
          onSuccess={this.onSuccess}
          initialValues={this.initialValues}
          storageId={storageId}
        />
        {fileListDocument && (
          <>
            {fileListDocument.prefixes && (
              <FilePrefixCard
                filePrefixType={fileListDocument.prefixes}
                onChangePrefix={this.onChangePrefix}
                storageId={storageId}
              />
            )}
            <FileListTableCard
              fileListDocument={fileListDocument}
              queryParams={queryParams}
              form={FILE_FILTER_FORM}
              sortField="queryParams.sort"
              storageId={storageId}
            />
          </>
        )}
        <FileEntity
          dialogName={FILE_ENTITY_DIALOG}
          onSuccess={(response) => history.push(`/file/${response.data.id}`)}
          storageId={storageId}
        />
      </>
    );
  }
}

export default compose(withUI, withFormActions, withFormSelectors)(FileList, FILE_FILTER_FORM);
