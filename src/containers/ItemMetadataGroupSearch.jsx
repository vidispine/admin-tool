import { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import { compose } from 'redux';

import ItemListCard from '../components/item/ItemListCard';
import ItemListGrid from '../components/item/ItemListGrid';
import ItemListTableCard from '../components/item/ItemListTableCard';
import MetadataGroupSearchDocument from '../components/item/ItemMetadataGroupSearch';
import ItemMetadataGroupSearchParams from '../components/item/ItemMetadataGroupSearchParams';
import TitleHeader from '../components/ui/TitleHeader';
import ViewSelect, { CARD_VIEW, GRID_VIEW, ROW_VIEW } from '../components/ui/ViewSelect';
import withFormActions from '../hoc/withFormActions';

const ITEM_METADATAGROUPSEARCH_FORM = 'ITEM_METADATAGROUPSEARCH_FORM';

class ItemMetadataGroupSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSearchSuccess = this.onSearchSuccess.bind(this);
    this.onSetUrlParams = this.onSetUrlParams.bind(this);
    this.onGetUrlParams = this.onGetUrlParams.bind(this);
    this.onChangeView = this.onChangeView.bind(this);
    const params = this.onGetUrlParams();
    const { first = 1, number = 10, orderBy, orderDirection = 'desc', ...queryParams } = params;
    const sort = orderBy ? [{ field: orderBy, order: `${orderDirection}ending` }] : [];
    this.initialValues = {
      queryParams: {
        first,
        number,
        ...queryParams,
      },
      metadataGroupSearchDocument: {
        sort,
      },
    };
    this.state = {
      itemListDocument: undefined,
      viewLayout: ROW_VIEW,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Item Metadata Group Search';
    setTimeout(this.onRefresh, 10); // wait for form to initialize
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ITEM_METADATAGROUPSEARCH_FORM);
  }

  onSearchSuccess(response) {
    const { data: itemListDocument, queryParams } = response;
    this.setState({
      itemListDocument,
      queryParams,
    });
    this.onSetUrlParams(queryParams);
  }

  onChangeView(viewLayout) {
    this.setState({ viewLayout });
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
    const { itemListDocument, queryParams, viewLayout } = this.state;
    return (
      <>
        <TitleHeader
          title="Item"
          helpTo="/ref/item/item.html"
          onRefresh={this.onRefresh}
          code={itemListDocument}
          codeModal="ItemListDocument"
        />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <MetadataGroupSearchDocument
              form={ITEM_METADATAGROUPSEARCH_FORM}
              defaultExpanded={false}
              onSuccess={this.onSearchSuccess}
              initialValues={this.initialValues}
              destroyOnUnmount={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemMetadataGroupSearchParams
              form={ITEM_METADATAGROUPSEARCH_FORM}
              defaultExpanded={false}
              onSuccess={this.onSearchSuccess}
              initialValues={this.initialValues}
              destroyOnUnmount={false}
            />
          </Grid>
        </Grid>
        <ViewSelect onChange={this.onChangeView} isActive={viewLayout} />
        {viewLayout === ROW_VIEW && (
          <ItemListTableCard
            form={ITEM_METADATAGROUPSEARCH_FORM}
            itemListDocument={itemListDocument}
            queryParams={queryParams}
          />
        )}
        {viewLayout === CARD_VIEW && (
          <ItemListCard
            form={ITEM_METADATAGROUPSEARCH_FORM}
            itemListDocument={itemListDocument}
            queryParams={queryParams}
          />
        )}
        {viewLayout === GRID_VIEW && (
          <ItemListGrid
            form={ITEM_METADATAGROUPSEARCH_FORM}
            itemListDocument={itemListDocument}
            queryParams={queryParams}
          />
        )}
      </>
    );
  }
}

export default compose(withFormActions)(ItemMetadataGroupSearch);
