import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
// import headerLogo from '../../assets/header-logo.svg';
import { ReactComponent as headerLogo } from '../../assets/header-logo.svg';

function VidispineIcon(props) {
  return (
    <SvgIcon {...props} component={headerLogo} viewBox="0 0 76.64 76.21" />
  );
}

export default VidispineIcon;
