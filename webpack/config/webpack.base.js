import { SOURCE_DIRECTORY, BUILD_DIRECTORY } from '../constans';
import merge from 'webpack-merge';
import { join } from 'path';

// Базовые модули
import * as modules from '../modules/base';

// Базовый плагины
import * as plugins from '../plugins/base';

export default () => {
  return merge(
    {
      entry: join(SOURCE_DIRECTORY, 'index.ts'),
      output: {
        path: BUILD_DIRECTORY,
        filename: 'js/[name].js',
        publicPath: '/',
      },
      resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
        alias: {
          '@': join(SOURCE_DIRECTORY, 'ts'),
        },
      },
    },
    modules.loadTypeScript(),
    modules.loadFonts(),
    modules.loadPug(),
    plugins.setupPug(),
    plugins.copyAssets()
  );
};
