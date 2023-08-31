import React from 'react';
import Typography from '@material-ui/core/Typography';

import Menu, { MenuItem } from '../ui/Menu';
import { withModalNoRouter } from '../../hoc/withModal';
import UnstyledLink from '../ui/UnstyledLink';

function ShapeComponentMenu({
  itemId,
  shapeId,
  componentId,
  onOpen,
  analyzeModal,
  removeModal,
  removeFileModal,
  associateFileModal,
  moveToShapeModal,
  copyToShapeModal,
  moveToComponentModal,
  copyToComponentModal,
}) {
  return (
    <Menu>
      <MenuItem component={UnstyledLink} to={`/item/${itemId}/shape/${shapeId}/component/${componentId}/`}>
        <Typography>Go To Component</Typography>
      </MenuItem>
      {analyzeModal ? (
        <MenuItem onClick={() => onOpen({
          modalName: analyzeModal, itemId, shapeId, componentId,
        })}
        >
          <Typography>Analyze</Typography>
        </MenuItem>
      ) : null}
      {associateFileModal ? (
        <MenuItem onClick={() => onOpen({
          modalName: associateFileModal, itemId, shapeId, componentId,
        })}
        >
          <Typography>Associate File</Typography>
        </MenuItem>
      ) : null}
      {moveToShapeModal ? (
        <MenuItem onClick={() => onOpen({
          modalName: moveToShapeModal, itemId, shapeId, componentId,
        })}
        >
          <Typography>Move To Shape</Typography>
        </MenuItem>
      ) : null}
      {copyToShapeModal ? (
        <MenuItem onClick={() => onOpen({
          modalName: copyToShapeModal, itemId, shapeId, componentId,
        })}
        >
          <Typography>Copy To Shape</Typography>
        </MenuItem>
      ) : null}
      {moveToComponentModal ? (
        <MenuItem onClick={() => onOpen({
          modalName: moveToComponentModal, itemId, shapeId, componentId,
        })}
        >
          <Typography>Move To Component</Typography>
        </MenuItem>
      ) : null}
      {copyToComponentModal ? (
        <MenuItem onClick={() => onOpen({
          modalName: copyToComponentModal, itemId, shapeId, componentId,
        })}
        >
          <Typography>Copy To Component</Typography>
        </MenuItem>
      ) : null}
      {removeFileModal ? (
        <MenuItem onClick={() => onOpen({
          modalName: removeFileModal, itemId, shapeId, componentId,
        })}
        >
          <Typography color="secondary">Unassociate File</Typography>
        </MenuItem>
      ) : null}
      {removeModal ? (
        <MenuItem onClick={() => onOpen({
          modalName: removeModal, itemId, shapeId, componentId,
        })}
        >
          <Typography color="secondary">Delete Component</Typography>
        </MenuItem>
      ) : null}
    </Menu>
  );
}

export default withModalNoRouter(ShapeComponentMenu);
