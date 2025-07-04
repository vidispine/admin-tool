import { FormSection, FieldArray } from 'redux-form';

import withErrorBoundary from '../../hoc/withErrorBoundary';

const MatrixFieldComponent = ({ fieldList, fields }) =>
  fieldList.map((thisField, index) => (
    <FormSection
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      name={`${fields.name}[${index}]`}
      component={thisField}
    />
  ));

function MatrixFieldArray({ component, ...props }) {
  return <FieldArray component={MatrixFieldComponent} fieldList={component} {...props} />;
}

export default withErrorBoundary(MatrixFieldArray);
