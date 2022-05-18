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
  console.info('%c🎉🎉🎉 Welcome to the VidiCore admin-tool!  🎉🎉🎉\n👻👻👻    Try using the "VidiCore" object   👻👻👻', styles);
  window.VidiCore = Object.keys(VidiCore).reduce((acc, cur) => {
    const val = Object.keys(VidiCore[cur]).reduce((thisAcc, thisCur) => {
      const thisVal = VidiCore[cur][thisCur];
      // eslint-disable-next-line no-console
      const thisFunc = (args) => thisVal(args).then(({ data }) => console.log(data));
      return { ...thisAcc, [thisCur]: thisFunc };
    }, {});
    return { ...acc, [cur]: val };
  }, {});
};

export default setWelcomeConsoleMessage;
