import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AnalyzePresetListTable from './AnalyzePresetListTable';

export default function AnalyzePresetListCard({
  analyzePresetListDocument,
}) {
  return (
    <Card>
      <CardContent>
        <AnalyzePresetListTable
          analyzePresetListDocument={analyzePresetListDocument}
        />
      </CardContent>
    </Card>
  );
}
