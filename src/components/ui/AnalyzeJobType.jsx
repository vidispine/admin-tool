import { TextField } from '../form';
import ChipInput from './ChipInput';
import FormSection from './FormSection';
import Field from './Field';
import FieldTypeArray from './FieldTypeArray';
import { OtifPresetType } from '../shapetag/ShapeTagForm';

const AnalyzeAudioJobType = () => (
  <>
    <FieldTypeArray
      name="otif"
      label="otif"
      component={OtifPresetType}
    />
  </>
);
const AnalyzeVideoJobType = () => (
  <>
    <FieldTypeArray
      name="otif"
      label="otif"
      component={OtifPresetType}
    />
  </>
);
const HighlighterType = () => (
  <>
    <Field
      name="model"
      component={TextField}
      fullWidth
    />
  </>
);
const SmartCropType = () => (
  <>
    <Field
      name="aspect"
      component={TextField}
      fullWidth
    />
  </>
);

const AnalyzeAudioChannelType = () => (
  <>
    <Field
      name="tone"
      label="tone"
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="stream"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="channel"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="thresh"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

const AnalyzeJobType = () => (
  <>
    <FormSection
      name="black"
      label="Black"
      component={() => (
        <>
          <Field
            name="threshold"
            component={TextField}
            type="number"
            fullWidth
          />
          <Field
            name="percentage"
            component={TextField}
            type="number"
            fullWidth
          />
        </>
      )}
    />
    <FormSection
      name="bars"
      label="Bars"
      component={() => (
        <>
          <Field
            name="threshold"
            component={TextField}
            type="number"
            fullWidth
          />
          <Field
            name="percentage"
            component={TextField}
            type="number"
            fullWidth
          />
        </>
      )}
    />
    <FormSection
      name="freeze"
      label="Freeze"
      component={() => (
        <>
          <Field
            name="threshold"
            component={TextField}
            type="number"
            fullWidth
          />
          <Field
            name="time"
            component={TextField}
            type="number"
            fullWidth
          />
        </>
      )}
    />
    <FieldTypeArray
      name="channel"
      label="channel"
      component={AnalyzeAudioChannelType}
    />
    <FormSection
      name="audio"
      label="Audio"
      component={AnalyzeAudioJobType}
    />
    <FormSection
      name="video"
      label="Video"
      component={AnalyzeVideoJobType}
    />
    <FormSection
      name="highlighter"
      label="Highlighter"
      component={HighlighterType}
    />
    <FormSection
      name="smartcrop"
      label="SmartCrop"
      component={SmartCropType}
    />
  </>
);

export default AnalyzeJobType;
