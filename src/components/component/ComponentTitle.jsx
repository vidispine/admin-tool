import TitleHeader from '../ui/TitleHeader';
import { withModalNoRouter } from '../../hoc/withModal';
import routes from '../../const/routes';

function ComponentTitle({
  title,
  itemId,
  shapeId,
  componentId,
  breadcrumbList = [],
  ...props
}) {
  return (
    <TitleHeader
      breadcrumbList={Array.isArray(breadcrumbList) ? [
        { title: 'Item', to: routes.itemList() },
        { title: itemId, to: routes.item({ itemId }) },
        { title: 'Shape', to: routes.shapeList({ itemId }) },
        { title: shapeId, to: routes.shape({ itemId, shapeId }) },
        { title: 'Component', to: routes.componentList({ itemId, shapeId }) },
        { title: componentId, to: routes.component({ itemId, shapeId, componentId }) },
        ...breadcrumbList]
        : undefined}
      {...props}
    />
  );
}

export default withModalNoRouter(ComponentTitle);
