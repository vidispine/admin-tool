import { Fragment } from 'react';

import { ItemHeading } from './ItemTitle';
import ItemContent from './ItemContent';

export default function ItemListContent({ itemListDocument }) {
  if (itemListDocument === undefined) { return null; }
  const { item: itemList = [] } = itemListDocument;
  return itemList.map((itemDocument) => (
    <Fragment
      key={itemDocument.id}
    >
      <ItemHeading
        itemId={itemDocument.id}
      />
      <ItemContent
        itemDocument={itemDocument}
      />
    </Fragment>
  ));
}
