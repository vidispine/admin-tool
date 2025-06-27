import SquareCard from '../ui/SquareCard';

import ShapeTagScriptEditor from './ShapeTagScriptEditor';

export default function MetadataDatasetCard(props) {
  return (
    <SquareCard>
      <ShapeTagScriptEditor {...props} />
    </SquareCard>
  );
}
