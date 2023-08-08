/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': `"${mode}"`,
  },
});
