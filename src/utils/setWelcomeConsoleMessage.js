/* eslint-disable no-console */
import * as VidiCore from '@vidispine/vdt-api';

const styles = `
    color:white;
    background-color:black;
    padding: 8px;
    font-weight: 600;
    font-family: Courier;
    font-size: 16px;
`;

const setWelcomeConsoleMessage = () => {
  console.info(
    '%cššš Welcome to the VidiCore admin-tool!  ššš\nš»š»š»    Try using the "VidiCore" object   š»š»š»\nš¤š¤š¤ https://vidispine.github.io/vdt-api/ š¤š¤š¤',
    styles,
  );
  window.VidiCore = Object.keys(VidiCore).reduce((acc, cur) => {
    const val = Object.keys(VidiCore[cur]).reduce((thisAcc, thisCur) => {
      const thisVal = VidiCore[cur][thisCur];
      const thisFunc = (args) => thisVal(args).then((resp) => {
      // eslint-disable-next-line no-console
        console.log(resp.data);
        return resp;
      });
      return { ...thisAcc, [thisCur]: thisFunc };
    }, {});
    return { ...acc, [cur]: val };
  }, {});
};

export default setWelcomeConsoleMessage;
