import { TextField } from '../form';
import { OtifPresetType } from '../shapetag/ShapeTagForm';

import ChipInput from './ChipInput';
import Field from './Field';
import FieldTypeArray from './FieldTypeArray';
import FormSection from './FormSection';

function AnalyzeAudioJobType() {
  return <FieldTypeArray name="otif" label="otif" component={OtifPresetType} />;
}
function AnalyzeVideoJobType() {
  return <FieldTypeArray name="otif" label="otif" component={OtifPresetType} />;
}
function HighlighterType() {
  return <Field name="model" component={TextField} fullWidth />;
}
function SmartCropType() {
  return <Field name="aspect" component={TextField} fullWidth />;
}

function AnalyzeAudioChannelType() {
  return (
    <>
      <Field name="tone" label="tone" component={ChipInput} simple fullWidth />
      <Field name="stream" component={TextField} type="number" fullWidth />
      <Field name="channel" component={TextField} type="number" fullWidth />
      <Field name="thresh" component={TextField} type="number" fullWidth />
    </>
  );
}

function AnalyzeJobBlackType() {
  return (
    <>
      <Field name="threshold" component={TextField} type="number" fullWidth />
      <Field name="percentage" component={TextField} type="number" fullWidth />
    </>
  );
}

function AnalyzeJobBarsType() {
  return (
    <>
      <Field name="threshold" component={TextField} type="number" fullWidth />
      <Field name="percentage" component={TextField} type="number" fullWidth />
    </>
  );
}
function AnalyzeJobFreezeType() {
  return (
    <>
      <Field name="threshold" component={TextField} type="number" fullWidth />
      <Field name="time" component={TextField} type="number" fullWidth />
    </>
  );
}

function AnalyzeJobType() {
  return (
    <>
      <FormSection name="black" label="Black" component={AnalyzeJobBlackType} />
      <FormSection name="bars" label="Bars" component={AnalyzeJobBarsType} />
      <FormSection name="freeze" label="Freeze" component={AnalyzeJobFreezeType} />
      <FieldTypeArray name="channel" label="channel" component={AnalyzeAudioChannelType} />
      <FormSection name="audio" label="Audio" component={AnalyzeAudioJobType} />
      <FormSection name="video" label="Video" component={AnalyzeVideoJobType} />
      <FormSection name="highlighter" label="Highlighter" component={HighlighterType} />
      <FormSection name="smartcrop" label="SmartCrop" component={SmartCropType} />
    </>
  );
}

export default AnalyzeJobType;
