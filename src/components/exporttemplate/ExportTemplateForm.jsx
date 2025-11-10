import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { required } from '../../utils/FieldValidation';
import { TextField } from '../form';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import CodeField from '../ui/CodeField';
import Field from '../ui/Field';
import FieldArray from '../ui/FieldArray';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';

const ExportTemplateArchiveType = ['ZIP', 'TAR'].map((value) => ({ value, label: value }));
const ExportTemplateCompressType = ['GZ', 'BZIP2'].map((value) => ({ value, label: value }));

function ExportTemplateArchive() {
  return (
    <>
      <Field
        name="method"
        label="Method"
        component={StatefulAsyncSelect}
        isClearable
        fullWidth
        isMulti
        options={ExportTemplateArchiveType}
        creatable
      />

      <ExportTemplateType />
    </>
  );
}

function ExportTemplateCollection() {
  return (
    <>
      <Field name="collectionId" label="collectionId" component={TextField} fullWidth />
      <ExportTemplateType />
    </>
  );
}

function ExportTemplateItem() {
  return (
    <>
      <Field name="itemId" label="itemId" component={TextField} fullWidth />
      <ExportTemplateType />
    </>
  );
}

function ExportTemplateComponent() {
  return <ExportTemplateType />;
}

function ExportTemplateComponentFile() {
  return <ExportTemplateType />;
}

function ExportTemplateCompress() {
  return (
    <>
      <Field
        name="method"
        label="Method"
        component={StatefulAsyncSelect}
        isClearable
        fullWidth
        isMulti
        options={ExportTemplateCompressType}
        creatable
      />

      <ExportTemplateType />
    </>
  );
}

function ExportTemplateDummy() {
  return <ExportTemplateType />;
}

function ExportTemplateExternal() {
  return (
    <>
      <Field name="uri" label="uri" component={ChipInput} simple fullWidth />
      <ExportTemplateType />
    </>
  );
}

function ExportTemplateFolder() {
  return <ExportTemplateType />;
}

function ExportTemplateTextContent() {
  return (
    <>
      <FieldArray
        name="exportTemplateChoiceGroup"
        label="Export Template Choice Group"
        // eslint-disable-next-line no-use-before-define
        component={ExportTemplateChoiceGroup}
      />
      <FormControlLabel
        control={<Field name="scripttags" component={BoolCheckbox} />}
        label="scripttags"
      />
    </>
  );
}

function ExportTemplateIterate() {
  return (
    <>
      <Field
        name="value"
        label="value"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/javascript',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />

      <ExportTemplateType />
    </>
  );
}

function ExportTemplateLibrary() {
  return (
    <>
      <Field name="libraryId" label="libraryId" component={TextField} fullWidth />
      <ExportTemplateType />
    </>
  );
}

function ExportTemplateSequence() {
  return (
    <>
      <FormSection name="document" component={ExportTemplateTextContent} />

      <FormControlLabel
        control={<Field name="generate" component={BoolCheckbox} />}
        label="generate"
      />
      <ExportTemplateType />
    </>
  );
}

function ExportTemplateShape() {
  return (
    <>
      <Field
        name="shapeTag"
        label="shapeTag"
        component={StatefulAsyncSelect}
        loadOptions={loadShapeTagOptions}
        cacheOptions
        isClearable
        fullWidth
        isMulti
        creatable
      />
      <FormControlLabel
        control={<Field name="generate" component={BoolCheckbox} />}
        label="generate"
      />
    </>
  );
}

function ExportTemplateText() {
  return (
    <>
      <FormSection name="content" component={ExportTemplateTextContent} />
      <Field
        name="xslt"
        label="xslt"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/xml',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <Field
        name="script"
        label="script"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/javascript',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />

      <Field
        name="xml"
        label="xml"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/xml',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <ExportTemplateType />
    </>
  );
}

function ExportTemplateChoiceGroup() {
  return (
    <>
      <FieldArray name="archive" label="archive" component={ExportTemplateArchive} />
      <FieldArray name="collection" label="collection" component={ExportTemplateCollection} />
      <FieldArray name="component" label="component" component={ExportTemplateComponent} />
      <FieldArray
        name="componentfile"
        label="componentfile"
        component={ExportTemplateComponentFile}
      />
      <FieldArray name="compress" label="compress" component={ExportTemplateCompress} />
      <FieldArray name="dummy" label="dummy" component={ExportTemplateDummy} />
      <FieldArray name="external" label="external" component={ExportTemplateExternal} />
      <FieldArray name="folder" label="folder" component={ExportTemplateFolder} />
      <FieldArray name="item" label="item" component={ExportTemplateItem} />
      <FieldArray name="iterate" label="iterate" component={ExportTemplateIterate} />
      <FieldArray name="library" label="library" component={ExportTemplateLibrary} />
      <FieldArray name="sequence" label="sequence" component={ExportTemplateSequence} />
      <FieldArray name="shape" label="shape" component={ExportTemplateShape} />
      <FieldArray name="text" label="text" component={ExportTemplateText} />

      <Field name="path" label="Path" component={TextField} fullWidth />
    </>
  );
}

function ExportTemplateType() {
  return (
    <>
      <FieldArray
        name="exportTemplateChoiceGroup"
        label="Export Template Choice Group"
        component={ExportTemplateChoiceGroup}
      />
      <Field
        name="tag"
        label="Tag"
        component={StatefulAsyncSelect}
        loadOptions={loadShapeTagOptions}
        cacheOptions
        isClearable
        fullWidth
        isMulti
        creatable
      />
      <Field name="dependency" label="Dependency" component={ChipInput} simple fullWidth />
      <Field name="filter" label="Filter" component={TextField} fullWidth />
      <Field
        name="filter"
        label="Filter"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/javascript',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />

      <Field
        name="pre"
        label="Pre"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/javascript',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <Field
        name="preRender"
        label="preRender"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/javascript',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
    </>
  );
}

function ExportTemplateForm({ templateName, error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!templateName && (
        <Field
          name="templateName"
          label="Template Name"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}

      <FormSection name="exportTemplateDocument" component={ExportTemplateType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ExportTemplateForm);
