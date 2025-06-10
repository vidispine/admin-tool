import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

export function BulkyMetadataEntry({ value = {} }) {
  return <TextGrid title={value.key} value={value.value} />;
}

export function BulkyMetadataMap({ value = {} }) {
  return <TypeArray value={value.entry} component={BulkyMetadataEntry} />;
}

export function BulkyMetadataMaps({ value = {} }) {
  return <TypeArray value={value.map} component={BulkyMetadataMap} />;
}

export function BulkyMetadataType({ value }) {
  return (
    <div style={{ marginBottom: 4 }}>
      {value.value && (
        <TextGrid
          title={`Start:${value.start} End:${value.end}`}
          value={value.value}
          titleStartCase={false}
          titleTypographyProps={{ noWrap: false }}
        />
      )}
      {value.maps && (
        <TypeSection
          title={`Start: ${value.start} End: ${value.end}`}
          titleStartCase={false}
          value={value.maps}
          component={BulkyMetadataMaps}
        />
      )}
    </div>
  );
}

export default function BulkyMetadataDisplay({ bulkyMetadataDocument }) {
  const { field = [] } = bulkyMetadataDocument;
  return <TypeArray value={field} component={BulkyMetadataType} />;
}
