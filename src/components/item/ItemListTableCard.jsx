import { compose } from 'redux';

import ItemListTable from './ItemListTable';

import withCard from '../../hoc/withCard';
import withPaginationForm from '../../hoc/withPaginationForm';

const ItemListTableCard = compose(withCard, withPaginationForm)(ItemListTable);

export default ItemListTableCard;
