import { exporttemplate as ExportTemplateApi } from '@vidispine/vdt-api';

import withSubmissionError from './withSubmissionError';

export const onListExportTemplate = withSubmissionError((form) => {
  const { queryParams } = form;
  return ExportTemplateApi.listExportTemplate({
    queryParams,
  });
});

export const onUpdateExportTemplate = withSubmissionError((form, dispatch, props) => {
  const { exportTemplateDocument } = form;
  const templateName = props.templateName || form.templateName;
  return ExportTemplateApi.updateExportTemplate({
    templateName,
    exportTemplateDocument,
  });
});

export const onTestExportTemplate = withSubmissionError((form) => {
  const { queryParams } = form;
  return ExportTemplateApi.createExportTemplateTest({
    queryParams,
  });
});

export const onRenderExportTemplate = withSubmissionError((form) => {
  const { queryParams } = form;
  return ExportTemplateApi.createExportTemplateTestRender({
    queryParams,
  });
});
