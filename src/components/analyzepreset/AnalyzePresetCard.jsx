import Card from '@material-ui/core/Card';

import AnalyzePresetEditor from './AnalyzePresetEditor';

export default function AnalyzePresetCard(props) {
  return (
    <Card>
      <AnalyzePresetEditor {...props} />
    </Card>
  );
}
