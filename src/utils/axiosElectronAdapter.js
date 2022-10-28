// eslint-disable-next-line import/no-extraneous-dependencies
import * as settle from 'axios/lib/core/settle';
// eslint-disable-next-line import/no-extraneous-dependencies
import AxiosError from 'axios/lib/core/AxiosError';

export default function axiosElectronAdapter(config) {
  return new Promise((resolve, reject) => {
    const {
      url, method, data, baseURL, headers,
    } = config;
    window.api.axios({
      url, method, data, baseURL, headers,
    }).then((responseData) => {
      if (responseData.errno) {
        const code = AxiosError[responseData.code] || AxiosError.ERR_BAD_REQUEST;
        reject(new AxiosError(responseData.message, code, config));
        return;
      }
      const response = {
        config,
        request: config,
        ...responseData,
      };
      settle(resolve, reject, response);
    }).catch((error) => {
      const response = {
        config,
        request: config,
        ...error,
      };
      settle(resolve, reject, response);
    });
  });
}
