import getSimpleMetadataVariant from '../../utils/getSimpleMetadataVariant';

import TextGrid from './TextGrid';

export default function SimpleMetadataDisplay({ simpleMetadataList = [] }) {
  return simpleMetadataList.map((simpleMetadata) => (
    <TextGrid
      key={simpleMetadata.key}
      title={simpleMetadata.key}
      value={simpleMetadata.value}
      titleStartCase={false}
      variant={getSimpleMetadataVariant(simpleMetadata.key)}
      hideCode
      hover
    />
  ));
}

export const SimpleMetadataType = ({ simpleMetadata }) => {
  const { field: fieldList = [] } = simpleMetadata;
  return fieldList.map((field) => (
    <TextGrid
      key={field.key}
      title={field.key}
      value={field.value}
      titleStartCase={false}
      variant={getSimpleMetadataVariant(field.key)}
      hideCode
    />
  ));
};
