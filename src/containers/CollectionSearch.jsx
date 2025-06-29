import { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import { compose } from 'redux';

import CollectionCreate from '../components/collection/CollectionCreate';
import CollectionListTable from '../components/collection/CollectionListTable';
import CollectionSearchDocument from '../components/collection/CollectionSearch';
import CollectionSearchParams from '../components/collection/CollectionSearchParams';
import TitleHeader from '../components/ui/TitleHeader';
import withCard from '../hoc/withCard';
import withFormActions from '../hoc/withFormActions';
import withPaginationForm from '../hoc/withPaginationForm';

const COLLECTION_CREATE_DIALOG = 'COLLECTION_CREATE_DIALOG';
const COLLECTION_SEARCH_FORM = 'COLLECTION_SEARCH_FORM';
const CollectionListTableCard = compose(withCard, withPaginationForm)(CollectionListTable);

class CollectionSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSearchSuccess = this.onSearchSuccess.bind(this);
    this.onSetUrlParams = this.onSetUrlParams.bind(this);
    this.onGetUrlParams = this.onGetUrlParams.bind(this);
    const params = this.onGetUrlParams();
    const { first = 1, number = 10, orderBy, orderDirection = 'desc', ...queryParams } = params;
    const sort = orderBy ? [{ field: orderBy, order: `${orderDirection}ending` }] : [];
    this.initialValues = {
      queryParams: {
        first,
        number,
        ...queryParams,
      },
      itemSearchDocument: {
        sort,
      },
    };
    this.state = {
      collectionListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Collection';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(COLLECTION_SEARCH_FORM);
  }

  onSearchSuccess(response) {
    const { data: collectionListDocument, queryParams } = response;
    this.setState({
      collectionListDocument,
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
    const { collectionListDocument, queryParams } = this.state;
    const { history } = this.props;
    return (
      <>
        <TitleHeader
          title="Collection"
          helpTo="/ref/collection.html"
          onRefresh={this.onRefresh}
          code={collectionListDocument}
          codeModal="CollectionListDocument"
          createModal={COLLECTION_CREATE_DIALOG}
        />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <CollectionSearchDocument
              form={COLLECTION_SEARCH_FORM}
              defaultExpanded={false}
              onSuccess={this.onSearchSuccess}
              initialValues={this.initialValues}
              destroyOnUnmount={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CollectionSearchParams
              form={COLLECTION_SEARCH_FORM}
              defaultExpanded={false}
              onSuccess={this.onSearchSuccess}
              initialValues={this.initialValues}
              destroyOnUnmount={false}
            />
          </Grid>
        </Grid>
        <CollectionListTableCard
          collectionListDocument={collectionListDocument}
          queryParams={queryParams}
          form={COLLECTION_SEARCH_FORM}
        />
        <CollectionCreate
          dialogName={COLLECTION_CREATE_DIALOG}
          onSuccess={(response) => history.push(`/collection/${response.data.id}`)}
        />
      </>
    );
  }
}

export default compose(withFormActions)(CollectionSearch);
