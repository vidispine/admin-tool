import Typography from '@material-ui/core/Typography';

import { withModalNoRouter } from '../../hoc/withModal';

import Menu, { MenuItem } from './Menu';
import UnstyledLink from './UnstyledLink';

function TitleMenu({ menuItems = [], onOpen }) {
  return (
    <Menu>
      {menuItems.map(({ label, to, modalName, color, Typography: TypographyProps = {} }) => {
        const Label = (
          <Typography color={color} {...TypographyProps}>
            {label}
          </Typography>
        );

        if (to) {
          return (
            <MenuItem key={to}>
              <UnstyledLink to={to}>{Label}</UnstyledLink>
            </MenuItem>
          );
        }

        if (modalName) {
          return (
            <MenuItem key={modalName} onClick={() => onOpen({ modalName })}>
              {Label}
            </MenuItem>
          );
        }
        return <MenuItem key={label}>{Label}</MenuItem>;
      })}
    </Menu>
  );
}
export default withModalNoRouter(TitleMenu);
