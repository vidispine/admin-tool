/* eslint-disable import/no-extraneous-dependencies */
import dns from 'dns';

import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';

dns.setDefaultResultOrder('verbatim');

const setProxy = ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const VIDISPINE_ENDPOINTS = ['/API/', '/APInoauth/', '/APIinit/', '/APIdoc/', '/UploadLicense/'];
  const VIDISPINE_URL = env.VITE_VIDISPINE_URL === '' ? undefined : env.VITE_VIDISPINE_URL;

  const proxyOptions = {
    target: VIDISPINE_URL,
    changeOrigin: true,
    selfHandleResponse: false,
    configure: (proxy) => {
      proxy.on('proxyRes', (proxyRes) => {
        // eslint-disable-next-line no-param-reassign
        delete proxyRes.headers['www-authenticate'];
      });
    },
  };

  const proxy = VIDISPINE_URL
    ? VIDISPINE_ENDPOINTS.reduce((a, c) => ({ ...a, [c]: proxyOptions }), {})
    : undefined;
  return proxy;
};

const base = process.env.PUBLIC_URL === '' ? '/' : process.env.PUBLIC_URL;

export default ({ mode }) =>
  defineConfig({
    base,
    server: {
      port: 3000,
      host: 'localhost',
      open: true,
      proxy: setProxy({ mode }),
    },
    plugins: [splitVendorChunkPlugin(), react()],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    build: {
      outDir: 'build',
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  });
