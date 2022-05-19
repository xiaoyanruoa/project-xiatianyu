/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    linterPlugin({
      include: ['./src/**/*.vue', './src/**/*.js'],
      linters: [new EsLinter()],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
