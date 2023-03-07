import { SubmissionError } from 'redux-form';
import { component as api } from '@vidispine/vdt-api';

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

export function onCreateComponent(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    return api.createComponent({
      itemId,
      shapeId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onCreateComponentPlaceholder(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    return api.createComponentPlaceholder({
      itemId,
      shapeId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onRemoveComponent(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    return api.removeComponent({
      itemId,
      shapeId,
      componentId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onCopyComponent(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    const targetItemId = props.targetItemId || form.targetItemId;
    const targetShapeId = props.targetShapeId || form.targetShapeId;
    const targetComponentId = props.targetComponentId || form.targetComponentId;
    return api.copyComponent({
      itemId,
      shapeId,
      componentId,
      targetItemId,
      targetShapeId,
      targetComponentId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onMoveComponent(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    const targetItemId = props.targetItemId || form.targetItemId;
    const targetShapeId = props.targetShapeId || form.targetShapeId;
    const targetComponentId = props.targetComponentId || form.targetComponentId;
    return api.moveComponent({
      itemId,
      shapeId,
      componentId,
      targetItemId,
      targetShapeId,
      targetComponentId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onMoveComponentToShape(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    const targetItemId = props.targetItemId || form.targetItemId;
    const targetShapeId = props.targetShapeId || form.targetShapeId;
    return api.moveComponentToShape({
      itemId,
      shapeId,
      componentId,
      targetItemId,
      targetShapeId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onCopyComponentToShape(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    const targetItemId = props.targetItemId || form.targetItemId;
    const targetShapeId = props.targetShapeId || form.targetShapeId;
    return api.copyComponentToShape({
      itemId,
      shapeId,
      componentId,
      targetItemId,
      targetShapeId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onAddComponentFile(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    const fileId = props.fileId || form.fileId;
    return api.addComponentFile({
      itemId,
      shapeId,
      componentId,
      fileId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onRemoveComponentFile(form, dispatch, props) {
  try {
    const { queryParams } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    const fileId = props.fileId || form.fileId;
    return api.removeComponentFile({
      itemId,
      shapeId,
      componentId,
      fileId,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}

export function onCreateComponentAnalyze(form, dispatch, props) {
  try {
    const { queryParams, analyzeJobDocument } = form;
    const itemId = props.itemId || form.itemId;
    const shapeId = props.shapeId || form.shapeId;
    const componentId = props.componentId || form.componentId;
    return api.createComponentAnalyze({
      itemId,
      shapeId,
      componentId,
      analyzeJobDocument,
      queryParams,
    })
      .catch(onError);
  } catch (error) {
    return onError(error);
  }
}
