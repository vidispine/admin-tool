import withErrorBoundary from '../../hoc/withErrorBoundary';

import TextGrid from './TextGrid';

function TextGridArray({ value, title, arrayKey, ...props }) {
  if (props.hideNoValue && value === undefined) {
    return null;
  }
  if (!Array.isArray(value)) {
    return null;
  }
  if (props.hideNoValue && value.lenght === 0) {
    return null;
  }
  return value.map((thisValue, index) => (
    <TextGrid
      key={arrayKey ? thisValue[arrayKey] : index} // eslint-disable-line react/no-array-index-key
      title={index === 0 ? title : ''}
      value={thisValue}
      {...props}
    />
  ));
}

export default withErrorBoundary(TextGridArray);
