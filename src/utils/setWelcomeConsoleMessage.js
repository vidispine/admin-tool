/* eslint-disable no-console */
import * as VidiCore from '@vidispine/vdt-api';

const setWelcomeConsoleMessage = () => {
  console.info('Welcome to the VidiCore admin-tool!  Try using the "VidiCore" global object');
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
