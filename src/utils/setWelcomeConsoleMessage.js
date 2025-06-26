/* eslint-disable no-console */
import * as VidiCoreApi from '@vidispine/vdt-api';
import * as vdtjs from '@vidispine/vdt-js';

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
    '%c🎉🎉🎉    Welcome to the VidiCore admin-tool!    🎉🎉🎉\n👻👻👻     Try using the "VidiCore" object    👻👻👻\n🤖🤖🤖    https://vidispine.github.io/vdt-api/   🤖🤖🤖\n👻👻👻    Try using the "vdtjs" object   👻👻👻\n🤖🤖🤖 https://vidispine.github.io/vdt/dev/?path=/docs/vdt-js-overview--docs 🤖🤖🤖',
    styles,
  );
  window.VidiCore = Object.keys(VidiCoreApi).reduce((acc, cur) => {
    const val = Object.keys(VidiCoreApi[cur]).reduce((thisAcc, thisCur) => {
      const thisVal = VidiCoreApi[cur][thisCur];
      const thisFunc = (args) =>
        thisVal(args).then((resp) => {
          // eslint-disable-next-line no-console
          console.log(resp.data);
          return resp;
        });
      return { ...thisAcc, [thisCur]: thisFunc };
    }, {});
    return { ...acc, [cur]: val };
  }, {});
  window.vdtjs = vdtjs;
};

export default setWelcomeConsoleMessage;
