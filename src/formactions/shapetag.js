import { shapetag as ShapeTagApi } from '@vidispine/vdt-api';

import withSubmissionError from './withSubmissionError';

export const onUpdate = withSubmissionError((form, dispatch, props) => {
  const { transcodePresetDocument } = form;
  const tagName = props.tagName || form.tagName || transcodePresetDocument.name;
  return ShapeTagApi.updateShapeTag({
    tagName,
    transcodePresetDocument,
  });
});

export const onUpdateScript = withSubmissionError((form, dispatch, props) => {
  const { shapeTagScript } = form;
  const tagName = props.tagName || form.tagName;
  return ShapeTagApi.updateShapeTagScript({
    tagName,
    shapeTagScript,
  });
});

export const onTestShapeTagScript = withSubmissionError((form, dispatch, props) => {
  const { queryParams } = form;
  const tagName = props.tagName || form.tagName;
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return ShapeTagApi.testShapeTagScript({
    tagName,
    itemId,
    shapeId,
    queryParams,
  });
});

export const onCreatePreset = withSubmissionError(() => ShapeTagApi.createShapeTagPreset());
