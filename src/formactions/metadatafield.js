import { metadatafield as MetadataFieldApi } from '@vidispine/vdt-api';

import withSubmissionError from './withSubmissionError';

export const onUpdate = withSubmissionError((form, dispatch, props) => {
  const { metadataFieldDocument } = form;
  const fieldName = props.fieldName || metadataFieldDocument.name;
  return MetadataFieldApi.updateMetadataField({
    fieldName,
    metadataFieldDocument,
  });
});

export const onGetAllowedValues = withSubmissionError((form, dispatch, props) => {
  const { metadataFieldValueConstraintListDocument } = form;
  const fieldName = props.fieldName || form.fieldName;
  return MetadataFieldApi.getMetadataFieldAllowedValues({
    fieldName,
    metadataFieldValueConstraintListDocument,
  });
});

export const onGetValues = withSubmissionError((form, dispatch, props) => {
  const { queryParams } = form;
  const fieldName = props.fieldName || form.fieldName;
  return MetadataFieldApi.getMetadataFieldValues({
    fieldName,
    queryParams,
  });
});

export const onGetMergedAccess = withSubmissionError((form, dispatch, props) => {
  const { queryParams } = form;
  const fieldName = props.fieldName || form.fieldName;
  return MetadataFieldApi.getMetadataFieldMergedAccess({
    fieldName,
    queryParams,
  });
});

export const onCreateMetadataFieldAccess = withSubmissionError((form, dispatch, props) => {
  const { metadataFieldAccessControlDocument } = form;
  const fieldName = props.fieldName || form.fieldName;
  return MetadataFieldApi.createMetadataFieldAccess({
    fieldName,
    metadataFieldAccessControlDocument,
  });
});
