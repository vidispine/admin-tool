import { job as JobApi } from '@vidispine/vdt-api';

import withSubmissionError from './withSubmissionError';

export const onJobList = withSubmissionError((form) => {
  const { queryParams } = form;
  return JobApi.listJob({
    queryParams,
  });
});

export const onJobSearch = withSubmissionError((form) => {
  const { queryParams, jobSearchDocument } = form;
  return JobApi.searchJob({
    queryParams,
    jobSearchDocument,
  });
});

export const onGetJob = withSubmissionError((form, dispatch, props) => {
  const jobId = props.jobId || form.jobId;
  const { queryParams } = form;
  return JobApi.getJob({
    jobId,
    queryParams,
  });
});

export const onModifyJob = withSubmissionError((form, dispatch, props) => {
  const jobId = props.jobId || form.jobId;
  const { queryParams } = form;
  return JobApi.modifyJob({
    jobId,
    queryParams,
  });
});

export const onDuplicateJob = withSubmissionError((form, dispatch, props) => {
  const jobId = props.jobId || form.jobId;
  const { queryParams } = form;
  return JobApi.duplicateJob({
    jobId,
    queryParams,
  });
});

export const onAbortJob = withSubmissionError((form, dispatch, props) => {
  const jobId = props.jobId || form.jobId;
  const { queryParams } = form;
  return JobApi.abortJob({
    jobId,
    queryParams,
  });
});

export const onCreateJob = withSubmissionError((form) => {
  const { queryParams } = form;
  return JobApi.createJob({
    queryParams,
  });
});
