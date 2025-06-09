/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

function ImgExpandButton({ initialAuto = false, ButtonBaseProps = {}, ...imgProps }) {
  const [width, setWidth] = useState(initialAuto ? 'auto' : '100%');
  const onClick = () => setWidth((prevWidth) => (prevWidth === '100%' ? 'auto' : '100%'));
  return (
    <ButtonBase
      onClick={onClick}
      disableRipple
      style={{ width }}
      {...ButtonBaseProps}
    >
      <img style={{ width }} {...imgProps} />
    </ButtonBase>
  );
}

export default ImgExpandButton;
