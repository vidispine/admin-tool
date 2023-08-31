/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

const VIDISPINE_ENDPOINTS = ['/API/', '/APInoauth/', '/APIinit/', '/APIdoc/', '/UploadLicense/'];
const VIDISPINE_URL = process.env.VITE_VIDISPINE_URL === '' ? undefined : process.env.VITE_VIDISPINE_URL;
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

const base = process.env.PUBLIC_URL === '' ? '/' : process.env.PUBLIC_URL;

export default ({ mode }) => defineConfig({
  base,
  server: {
    port: 3000,
    host: 'localhost',
    open: true,
    proxy,

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
