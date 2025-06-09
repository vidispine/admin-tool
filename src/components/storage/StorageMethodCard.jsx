import Card from '@material-ui/core/Card';

import CardList from '../ui/CardList';
import StorageMethodEditor from './StorageMethodEditor';
import StorageMethodMetadataEditor from './StorageMethodMetadataEditor';

export default function StorageCard(props) {
  return (
    <CardList>
      <Card>
        <StorageMethodEditor
          {...props}
        />
      </Card>
      <Card>
        <StorageMethodMetadataEditor
          {...props}
        />
      </Card>

    </CardList>
  );
}
