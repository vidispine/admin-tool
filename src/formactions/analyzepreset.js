import { analyzepreset as AnalyzePresetApi } from '@vidispine/vdt-api';

import withSubmissionError from './withSubmissionError';

export const onListAnalyzePreset = withSubmissionError((form) => {
  const { queryParams } = form;
  return AnalyzePresetApi.listAnalyzePreset({ queryParams });
});

export const onUpdateAnalyzePreset = withSubmissionError((form, dispatch, props) => {
  const { analyzePresetDocument } = form;
  const preset = props.preset || form.preset || analyzePresetDocument.name;
  return AnalyzePresetApi.getAnalyzePreset({
    preset,
    body: analyzePresetDocument,
    method: 'PUT',
  });
});
