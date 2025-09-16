import routes from '../../const/routes';
import TitleHeader from '../ui/TitleHeader';

export default function MetadataFieldTitle({ breadcrumbList = [], fieldName, ...props }) {
  return (
    <TitleHeader
      helpTo="/ref/metadata/field.html"
      entityId={fieldName}
      entityType="metadata-field"
      breadcrumbList={[
        { title: 'Metadata Field', to: routes.metadataFieldList() },
        { title: fieldName, to: routes.metadataField({ fieldName }) },
        ...breadcrumbList,
      ]}
      {...props}
    />
  );
}
