import { PureComponent } from 'react';

import { compose } from 'redux';

import withFormActions from './withFormActions';
import withPagination from './withPagination';
import { withRouterProps } from './withRouterProps';

const withPaginationForm = (WrappedComponent) =>
  class extends PureComponent {
    constructor(props) {
      super(props);
      this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
      this.onChangePage = this.onChangePage.bind(this);
      this.onChangeOrder = this.onChangeOrder.bind(this);
      this.onSetUrlParams = this.onSetUrlParams.bind(this);
      this.onGetUrlParams = this.onGetUrlParams.bind(this);
      const urlParams = this.onGetUrlParams();
      const { orderBy = '', orderDirection = '' } = urlParams;
      let { first = 1, number = 10 } = urlParams;
      if (!Number.isInteger(first)) {
        first = parseInt(first, 10);
      }
      if (Number.isNaN(first) || first <= 0) {
        first = 1;
      }
      if (!Number.isInteger(number)) {
        number = parseInt(number, 10);
      }
      if (Number.isNaN(number) || number <= 0) {
        number = 10;
      }
      const page = Math.floor((first - 1) / number);
      this.state = {
        page,
        rowsPerPage: number,
        orderBy,
        orderDirection,
      };
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

    async onChangeRowsPerPage({ rowsPerPage: number }) {
      const {
        changeForm,
        firstField = 'queryParams.first',
        numberField = 'queryParams.number',
        submitForm,
        form,
      } = this.props;
      const first = 1;
      changeForm(form, firstField, first);
      await changeForm(form, numberField, number);
      this.onSetUrlParams({ first, number });
      submitForm(form);
    }

    async onChangePage({ page, rowsPerPage }) {
      const {
        formValues = {},
        changeForm,
        firstField = 'queryParams.first',
        numberField = 'queryParams.number',
        submitForm,
        form,
      } = this.props;
      const { queryParams = {} } = formValues;
      const { number = rowsPerPage } = queryParams;
      const first = page * number + 1;
      changeForm(form, firstField, first);
      await changeForm(form, numberField, number);
      this.onSetUrlParams({ first, number });
      submitForm(form);
    }

    async onChangeOrder({ orderBy, orderDirection }) {
      const {
        changeForm,
        submitForm,
        sortField = 'itemSearchDocument.sort',
        firstField = 'queryParams.first',
        form,
      } = this.props;
      const sortString = sortField.startsWith('queryParams');
      let sortValue = sortString ? undefined : [];
      if (orderBy) {
        if (sortString === false) {
          const order = `${orderDirection}ending`;
          sortValue = [{ field: orderBy, order }];
        } else {
          sortValue = `${orderBy} ${orderDirection}`;
        }
      }
      const first = 1;
      changeForm(form, sortField, sortValue);
      await changeForm(form, firstField, first);
      this.onSetUrlParams({ orderDirection, orderBy, first });
      submitForm(form);
    }

    render() {
      const { page, rowsPerPage, orderBy, orderDirection } = this.state;
      return (
        <WrappedComponent
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
          orderBy={orderBy}
          orderDirection={orderDirection}
          onChangeOrder={this.onChangeOrder}
          {...this.props}
        />
      );
    }
  };

export default compose(withRouterProps, withFormActions, withPaginationForm, withPagination);
