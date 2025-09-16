import routes from '../../const/routes';
import TitleHeader from '../ui/TitleHeader';

export default function FieldGroupTitle({ breadcrumbList = [], groupName, ...props }) {
  return (
    <TitleHeader
      helpTo="/ref/metadata/field-group.html"
      entityId={groupName}
      entityType="field-group"
      breadcrumbList={[
        { title: 'Metadata Field Group', to: routes.fieldGroupList() },
        { title: groupName, to: routes.fieldGroup({ groupName }) },
        ...breadcrumbList,
      ]}
      {...props}
    />
  );
}
