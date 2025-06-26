import Card from '@material-ui/core/Card';

import CardList from '../ui/CardList';

import {
  StorageBasicDisplay,
  StorageAdvancedDisplay,
  StorageScriptDisplay,
} from './StorageDisplay';
import StorageEditor from './StorageEditor';
import { StorageBasicForm, StorageAdvancedForm, StorageScriptForm } from './StorageForm';
import StorageMetadataEditor from './StorageMetadataEditor';
import StorageMethodList from './StorageMethodList';

export default function StorageCard(props) {
  return (
    <CardList>
      <Card>
        <StorageEditor
          title="Settings"
          formComponent={StorageBasicForm}
          displayComponent={StorageBasicDisplay}
          {...props}
        />
      </Card>
      <Card>
        <StorageMethodList {...props} />
      </Card>
      <Card>
        <StorageEditor
          title="Advanced"
          formComponent={StorageAdvancedForm}
          displayComponent={StorageAdvancedDisplay}
          {...props}
        />
      </Card>
      <Card>
        <StorageMetadataEditor {...props} />
      </Card>
      <Card>
        <StorageEditor
          title="Scripts"
          formComponent={StorageScriptForm}
          displayComponent={StorageScriptDisplay}
          {...props}
        />
      </Card>
    </CardList>
  );
}
