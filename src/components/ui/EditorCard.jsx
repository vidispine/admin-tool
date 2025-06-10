import { useState } from 'react';

import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Delete from '@material-ui/icons/Delete';

import SquareCard from './SquareCard';

export function DefaultToggleComponent({ isEditing, toggleEdit }) {
  return (
    <FormControlLabel
      control={<Switch color="primary" />}
      label="Edit"
      checked={isEditing}
      onChange={toggleEdit}
    />
  );
}

export function DefaultRemoveComponent({ onRemove }) {
  return (
    <IconButton onClick={onRemove}>
      <Delete />
    </IconButton>
  );
}

export function DefaultActionComponent({
  toggleComponent: ToggleComponent = DefaultToggleComponent,
  toggleProps = {},
  removeComponent: RemoveComponent = DefaultRemoveComponent,
  removeProps = {},
  isEditing,
  toggleEdit,
  onRemove,
  ...props
}) {
  return (
    <>
      {onRemove && <RemoveComponent onRemove={onRemove} {...removeProps} {...props} />}
      {toggleEdit && (
        <ToggleComponent
          isEditing={isEditing}
          toggleEdit={toggleEdit}
          {...toggleProps}
          {...props}
        />
      )}
    </>
  );
}

export function DefaultCardHeaderComponent({
  actionComponent: ActionComponent = DefaultActionComponent,
  actionProps = {},
  isEditing,
  toggleEdit,
  onRemove,
  cardHeaderProps = {},
  ...props
}) {
  return (
    <CardHeader
      action={
        <ActionComponent
          isEditing={isEditing}
          toggleEdit={toggleEdit}
          onRemove={onRemove}
          {...actionProps}
          {...props}
        />
      }
      {...cardHeaderProps}
    />
  );
}

export function DefaultCardContentComponent({
  editComponent: EditComponent,
  editProps = {},
  displayComponent: DisplayComponent,
  displayProps = {},
  isEditing,
  ...props
}) {
  return (
    <CardContent>
      {isEditing ? (
        <EditComponent {...editProps} {...props} />
      ) : (
        <DisplayComponent {...displayProps} {...props} />
      )}
    </CardContent>
  );
}

export function DefaultCardComponent({ children }) {
  return <SquareCard>{children}</SquareCard>;
}

export function DefaultCardActionComponent({
  isEditing = false,
  toggleEdit,
  onSave,
  saveProps = {},
  cancelProps = {},
}) {
  return isEditing ? (
    <>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={toggleEdit} {...cancelProps}>
          Cancel
        </Button>
        <Button onClick={onSave} size="small" color="primary" {...saveProps}>
          Save
        </Button>
      </AccordionActions>
    </>
  ) : null;
}

function EditorCard({
  initialState = false,
  editComponent: EditComponent,
  editProps = {},
  displayComponent: DisplayComponent,
  displayProps = {},
  cardComponent: CardComponent = DefaultCardComponent,
  cardProps = {},
  cardHeaderComponent: CardHeaderComponent = DefaultCardHeaderComponent,
  cardHeaderProps = {},
  cardContentComponent: CardContentComponent = DefaultCardContentComponent,
  cardContentProps = {},
  cardActionComponent: CardActionComponent = DefaultCardActionComponent,
  cardActionProps = {},
  onRemove,
  onSave,
  ...props
}) {
  const [isEditing, setIsEditing] = useState(initialState);
  const toggleEdit = () => setIsEditing(!isEditing);
  return (
    <CardComponent {...cardProps} {...props}>
      <CardHeaderComponent
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        onRemove={onRemove}
        cardHeaderProps={cardHeaderProps}
        {...props}
      />
      <CardContentComponent
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        editComponent={EditComponent}
        editProps={editProps}
        displayComponent={DisplayComponent}
        displayProps={displayProps}
        {...cardContentProps}
        {...props}
      />
      <CardActionComponent
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        onSave={onSave}
        {...cardActionProps}
        {...props}
      />
    </CardComponent>
  );
}

export default EditorCard;
