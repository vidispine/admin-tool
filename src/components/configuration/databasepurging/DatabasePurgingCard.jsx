import SquareCard from '../../ui/SquareCard';
import DatabasePurgingEditor from './DatabasePurgingEditor';

export default function DatabasePurgingCard(props) {
  return (
    <SquareCard>
      <DatabasePurgingEditor
        {...props}
      />
    </SquareCard>
  );
}
