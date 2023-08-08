const { createProxyMiddleware } = require('http-proxy-middleware'); // eslint-disable-line import/no-extraneous-dependencies

const VIDISPINE_ENDPOINTS = ['/API/', '/APInoauth/', '/APIinit/', '/APIdoc/', '/UploadLicense/'];

const VIDISPINE_URL = process.env.VITE_VIDISPINE_URL === '' ? undefined : process.env.VITE_VIDISPINE_URL;

const onProxyRes = (proxyRes) => delete proxyRes.headers['www-authenticate']; // eslint-disable-line no-param-reassign

function useProxy(app) {
  if (VIDISPINE_URL) {
    app.use(
      createProxyMiddleware(VIDISPINE_ENDPOINTS, {
        target: VIDISPINE_URL,
        changeOrigin: true,
        onProxyRes,
      }),
    );
  }
}

module.exports = useProxy;
