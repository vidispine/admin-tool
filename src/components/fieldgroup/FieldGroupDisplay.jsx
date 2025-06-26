import {
  MetadataSchemaElementType,
  MetadataFieldType,
} from '../metadatafield/MetadataFieldDisplay';
import { KeyValuePairType } from '../ui/FormType';
import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

function MetadataFieldAccessControlType({ value = {} }) {
  return (
    <>
      <TextGrid title="field" value={value.field} hover />
      <TextGrid title="fieldGroup" value={value.fieldGroup} hover />
      <TextGrid title="user" value={value.user} hover />
      <TextGrid title="group" value={value.group} hover />
      <TextGrid title="permission" value={value.permission} hover />
    </>
  );
}

function BasicSection({ value = {} }) {
  return (
    <>
      <TextGrid title="name" value={value.name} hover />
      <TextGrid title="inheritance" value={value.inheritance} variant="boolean" hover />
    </>
  );
}

function SchemaSection({ value = {} }) {
  return (
    <TypeSection
      title="schema"
      value={value.schema}
      component={MetadataSchemaElementType}
      hideNoValue
    />
  );
}

function DataSection({ value = {} }) {
  return <TypeSection title="data" value={value.data} component={KeyValuePairType} hideNoValue />;
}

function AccessSection({ value = {} }) {
  return (
    <TypeArray title="access" value={value.access} component={MetadataFieldAccessControlType} />
  );
}

function FieldSection({ value = {} }) {
  return (
    <TypeArray
      arrayTitle="Child Fields"
      titleKey="name"
      titleStartCase={false}
      value={value.field}
      component={MetadataFieldType}
    />
  );
}

function MetadataFieldGroupType({ value = {} }) {
  return (
    <>
      <BasicSection value={value} />
      <SchemaSection value={value} />
      <FieldSection value={value} />
      <TypeArray
        arrayTitle="Child Groups"
        titleKey="name"
        titleStartCase={false}
        value={value.group}
        component={MetadataFieldGroupType}
      />
      <DataSection value={value} />
      <AccessSection value={value} />
    </>
  );
}

function GroupSection({ value = {} }) {
  return (
    <TypeArray
      arrayTitle="Child Groups"
      titleKey="name"
      titleStartCase={false}
      value={value.group}
      component={MetadataFieldGroupType}
    />
  );
}

export function FieldGroupBasicDisplay({ metadataFieldGroupDocument }) {
  return <TypeSection component={BasicSection} value={metadataFieldGroupDocument} />;
}

export function FieldGroupSchemaDisplay({ metadataFieldGroupDocument }) {
  return <TypeSection component={SchemaSection} value={metadataFieldGroupDocument} />;
}

export function FieldGroupGroupDisplay({ metadataFieldGroupDocument }) {
  return <TypeSection component={GroupSection} value={metadataFieldGroupDocument} />;
}

export function FieldGroupDataDisplay({ metadataFieldGroupDocument }) {
  return <TypeSection component={DataSection} value={metadataFieldGroupDocument} />;
}

export function FieldGroupAccessDisplay({ metadataFieldGroupDocument }) {
  return <TypeSection component={AccessSection} value={metadataFieldGroupDocument} />;
}

export function FieldGroupFieldDisplay({ metadataFieldGroupDocument }) {
  return <TypeSection component={FieldSection} value={metadataFieldGroupDocument} />;
}

export default function FieldGroupDisplay({ metadataFieldGroupDocument }) {
  return <TypeSection component={MetadataFieldGroupType} value={metadataFieldGroupDocument} />;
}
