import { Fragment } from 'react';

import ShapeOverview from './ShapeOverview';
import ShapeTitle, { ShapeHeading } from './ShapeTitle';

export default function ShapeOverviewList({ shapeList = [], itemId }) {
  if (shapeList === undefined || !Array.isArray(shapeList)) {
    return null;
  }
  return shapeList.map((shapeDocument) => (
    <Fragment key={shapeDocument.id}>
      {itemId ? (
        <ShapeTitle shapeId={shapeDocument.id} itemId={itemId} />
      ) : (
        <ShapeHeading shapeId={shapeDocument.id} />
      )}
      <ShapeOverview shapeDocument={shapeDocument} />
    </Fragment>
  ));
}
