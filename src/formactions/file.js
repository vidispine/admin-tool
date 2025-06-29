import { SubmissionError } from 'redux-form';

import { file as api } from '@vidispine/vdt-api';

export function onUpdateFileState(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { state } = form;
  return api
    .updateFileState({
      fileId,
      state,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateFileHash(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { hash, queryParams } = form;
  return api
    .updateFileHash({
      fileId,
      hash,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileMove(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { targetStorageId, queryParams } = form;
  return api
    .createFileMove({
      fileId,
      targetStorageId,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileDelete(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { queryParams } = form;
  return api
    .removeFile({
      fileId,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFilePath(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { queryParams } = form;
  return api
    .createFilePath({
      fileId,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileOverwrite(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { queryParams, file } = form;
  return api
    .updateFileRaw({
      fileId,
      file: file[0],
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGetFile(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { queryParams } = form;
  return api
    .getFile({
      fileId,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileList(form, dispatch, props) {
  const { storageId } = props;
  const { queryParams } = form;
  if (storageId) {
    return api
      .listFileStorage({
        storageId,
        queryParams,
      })
      .catch((error) => {
        let errorMessage = error.message;
        if (error.response) {
          errorMessage = JSON.stringify(error.response.data, (k, v) =>
            v === null ? undefined : v,
          );
        }
        throw new SubmissionError({ _error: errorMessage });
      });
  }
  return api
    .listFile({
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileCreateEntity(form) {
  const { fileDocument, queryParams, storageId } = form;
  return api
    .createFileEntity({
      storageId,
      fileDocument,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileImport(form, dispatch, props) {
  const { metadataDocument, queryParams } = form;
  const fileId = props.fileId || form.fileId;
  return api
    .createFileImport({
      fileId,
      metadataDocument,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileImportAssetMap(form, dispatch, props) {
  const { metadataDocument, queryParams } = form;
  const fileId = props.fileId || form.fileId;
  return api
    .createFileImportAssetMap({
      fileId,
      metadataDocument,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileAnalyze(form, dispatch, props) {
  const { queryParams } = form;
  const fileId = props.fileId || form.fileId;
  return api
    .analyzeFile({
      fileId,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileImpAnalyze(form, dispatch, props) {
  const { queryParams } = form;
  const fileId = props.fileId || form.fileId;
  return api
    .analyzeFileImp({
      fileId,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
export function onCreateFileTemporaryCredentials(form, dispatch, props) {
  const { queryParams } = form;
  const fileId = props.fileId || form.fileId;
  return api
    .createFileTemporaryCredentials({
      fileId,
      queryParams,
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
