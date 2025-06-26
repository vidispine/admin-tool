import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField, Select } from '../form';
import { MetadataSchemaElementType, MetadataFieldType } from '../metadatafield/MetadataFieldForm';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import { KeyValuePairType } from '../ui/FormType';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';

function MetadataFieldAccessControlType() {
  return (
    <>
      <Field name="field" label="field" component={TextField} fullWidth />
      <Field name="fieldGroup" label="fieldGroup" component={TextField} fullWidth />
      <Field name="user" label="user" component={TextField} fullWidth />
      <Field name="group" label="group" component={TextField} fullWidth />
      <Field name="permission" label="permission" component={TextField} fullWidth />
    </>
  );
}

function BasicSection() {
  return (
    <>
      <Field name="name" label="name" component={InitialDisabledTextField} fullWidth />
      <FormControl fullWidth>
        <InputLabel htmlFor="inheritance">Inheritance</InputLabel>
        <Field name="inheritance" component={Select}>
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Field>
      </FormControl>
    </>
  );
}

function AccessSection() {
  return <FieldTypeArray name="access" label="access" component={MetadataFieldAccessControlType} />;
}

function FieldSection() {
  return <FieldTypeArray name="field" label="field" component={MetadataFieldType} />;
}

function SchemaSection() {
  return <FormSection name="schema" label="schema" component={MetadataSchemaElementType} />;
}

function DataSection() {
  return <FieldTypeArray name="data" label="data" component={KeyValuePairType} />;
}

function MetadataFieldGroupType() {
  return (
    <>
      <BasicSection />
      <SchemaSection />
      <FieldSection />
      <FieldTypeArray name="group" label="group" component={MetadataFieldGroupType} />
      <AccessSection />
      <DataSection />
    </>
  );
}

function GroupSection() {
  return <FieldTypeArray name="group" label="group" component={MetadataFieldGroupType} />;
}

function DataForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldGroupDocument" component={DataSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const FieldGroupDataForm = reduxForm()(DataForm);

function BasicForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldGroupDocument" component={BasicSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const FieldGroupBasicForm = reduxForm()(BasicForm);

function SchemaForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldGroupDocument" component={SchemaSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const FieldGroupSchemaForm = reduxForm()(SchemaForm);

function FieldForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldGroupDocument" component={FieldSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const FieldGroupFieldForm = reduxForm()(FieldForm);

function GroupForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldGroupDocument" component={GroupSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const FieldGroupGroupForm = reduxForm()(GroupForm);

function AccessForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldGroupDocument" component={AccessSection} />
      <button type="submit" hidden />
    </form>
  );
}

export const FieldGroupAccessForm = reduxForm()(AccessForm);

function FieldGroupForm({ error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection name="metadataFieldGroupDocument" component={MetadataFieldGroupType} />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FieldGroupForm);
