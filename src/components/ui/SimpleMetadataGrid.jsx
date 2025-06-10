import SimpleMetadataDisplay from './SimpleMetadataDisplay';
import SimpleMetadataEditor from './SimpleMetadataEditor';

export default function SimpleMetadataGrid(props) {
  if (props?.editable) {
    return <SimpleMetadataEditor {...props} />;
  }
  return <SimpleMetadataDisplay {...props} />;
}
