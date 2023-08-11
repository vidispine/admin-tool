import { SubmissionError } from 'redux-form';
import { bulkymetadata as BulkyMetadataApi } from '@vidispine/vdt-api';

const onError = (error) => {
  let errorMessage = error.message;
  if (error.response) {
    errorMessage = JSON.stringify(
      error.response.data, (k, v) => (v === null ? undefined : v
      ),
    );
  }
  throw new SubmissionError({ _error: errorMessage });
};

const queryParamSerializer = (queryParams = {}) => Object.entries(queryParams)
  .reduce((a, [key, value]) => ({ ...a, [key]: encodeURIComponent(value) }), {});

export function onGetItemBulkyMetadataAsFile(form, dispatch, props) {
  try {
    const queryParams = queryParamSerializer(form.queryParams);
    const itemId = props.itemId || form.itemId;
    const bulkyMetadataKey = props.bulkyMetadataKey || form.bulkyMetadataKey;
    return BulkyMetadataApi.getItemBulkyMetadata({
      itemId,
      key: bulkyMetadataKey,
      path: `/API/item/${itemId}/metadata/bulky/${bulkyMetadataKey}/as-file`,
      headers: { accept: 'application/octet-stream' },
      queryParams,
      transitional: {
        silentJSONParsing: false,
        forcedJSONParsing: false,
      },
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onGetShapeBulkyMetadataAsFile(form, dispatch, props) {
  try {
    const queryParams = queryParamSerializer(form.queryParams);
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const bulkyMetadataKey = props.bulkyMetadataKey || form.bulkyMetadataKey;
    return BulkyMetadataApi.getShapeBulkyMetadata({
      itemId,
      shapeId,
      key: bulkyMetadataKey,
      path: `/API/item/${itemId}/shape/${shapeId}/metadata/bulky/${bulkyMetadataKey}/as-file`,
      headers: { accept: 'application/octet-stream' },
      queryParams,
      transitional: {
        silentJSONParsing: false,
        forcedJSONParsing: false,
      },
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onGetComponentBulkyMetadataAsFile(form, dispatch, props) {
  try {
    const queryParams = queryParamSerializer(form.queryParams);
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    const bulkyMetadataKey = props.bulkyMetadataKey || form.bulkyMetadataKey;
    return BulkyMetadataApi.getComponentBulkyMetadata({
      itemId,
      shapeId,
      componentId,
      key: bulkyMetadataKey,
      path: `/API/item/${itemId}/shape/${shapeId}/component/${componentId}/metadata/bulky/${bulkyMetadataKey}/as-file`,
      headers: { accept: 'application/octet-stream' },
      queryParams,
      transitional: {
        silentJSONParsing: false,
        forcedJSONParsing: false,
      },
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}
