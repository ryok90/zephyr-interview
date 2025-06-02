import { NxAppRspackPlugin } from '@nx/rspack/app-plugin';
import { NxReactRspackPlugin } from '@nx/rspack/react-plugin';
import { NxModuleFederationPlugin } from '@nx/module-federation/rspack';
import { join } from 'path';

import config from './module-federation.config';

export default {
  output: {
    path: join(__dirname, 'dist'),
    publicPath: 'auto',
  },
  devServer: {
    port: 4201,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    },
  },
  plugins: [
    new NxAppRspackPlugin({
      tsConfig: './tsconfig.app.json',
      main: './src/main.ts',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.css'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactRspackPlugin(),
    new NxModuleFederationPlugin({ config }, { dts: false }),
  ],
};
