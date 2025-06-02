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
    port: 4200,
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
      index: './index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.css'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactRspackPlugin(),
    new NxModuleFederationPlugin(
      { config },
      {
        dts: false,
        runtimePlugins: [
          require.resolve(join(__dirname, './src/mf-plugins/error-handler')),
        ],
      }
    ),
  ],
};
