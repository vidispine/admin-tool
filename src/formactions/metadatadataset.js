import { metadatadataset as MetadataDatasetApi } from '@vidispine/vdt-api';

import withSubmissionError from './withSubmissionError';

export const onUpdate = withSubmissionError((form, dispatch, props) => {
  const { body, headers } = form;
  const datasetId = props.datasetId || form.datasetId;
  return MetadataDatasetApi.updateMetadataDataset({
    datasetId,
    body,
    headers: { accept: headers.contentType, contentType: headers.contentType },
  });
});
