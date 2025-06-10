import { Fragment } from 'react';

import ItemContent from './ItemContent';
import { ItemHeading } from './ItemTitle';

export default function ItemListContent({ itemListDocument }) {
  if (itemListDocument === undefined) {
    return null;
  }
  const { item: itemList = [] } = itemListDocument;
  return itemList.map((itemDocument) => (
    <Fragment key={itemDocument.id}>
      <ItemHeading itemId={itemDocument.id} />
      <ItemContent itemDocument={itemDocument} />
    </Fragment>
  ));
}
