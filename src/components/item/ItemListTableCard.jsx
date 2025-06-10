import { compose } from 'redux';

import withCard from '../../hoc/withCard';
import withPaginationForm from '../../hoc/withPaginationForm';

import ItemListTable from './ItemListTable';

const ItemListTableCard = compose(withCard, withPaginationForm)(ItemListTable);

export default ItemListTableCard;
