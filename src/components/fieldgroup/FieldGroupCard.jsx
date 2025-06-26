import SquareCard from '../ui/SquareCard';

import FieldGroupChildEditor from './FieldGroupChildEditor';
import {
  FieldGroupBasicDisplay,
  FieldGroupSchemaDisplay,
  FieldGroupAccessDisplay,
} from './FieldGroupDisplay';
import FieldGroupEditor from './FieldGroupEditor';
import FieldGroupFieldEditor from './FieldGroupFieldEditor';
import { FieldGroupBasicForm, FieldGroupSchemaForm, FieldGroupAccessForm } from './FieldGroupForm';

export default function FieldGroupCard(props) {
  return (
    <>
      <SquareCard>
        <FieldGroupEditor
          title="Overview"
          formComponent={FieldGroupBasicForm}
          displayComponent={FieldGroupBasicDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <FieldGroupEditor
          title="Schema"
          formComponent={FieldGroupSchemaForm}
          displayComponent={FieldGroupSchemaDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <FieldGroupFieldEditor {...props} />
      </SquareCard>
      <SquareCard>
        <FieldGroupChildEditor {...props} />
      </SquareCard>
      <SquareCard>
        <FieldGroupEditor
          title="Access"
          formComponent={FieldGroupAccessForm}
          displayComponent={FieldGroupAccessDisplay}
          {...props}
        />
      </SquareCard>
    </>
  );
}
