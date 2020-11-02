import CopyPlugin from 'copy-webpack-plugin';
import { SOURCE_DIRECTORY, BUILD_DIRECTORY } from '../../constans';
import { join } from 'path';

export function copyAssets() {
  return {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: join(SOURCE_DIRECTORY, 'assets'),
            to: join(BUILD_DIRECTORY, 'assets'),
          },
        ],
      }),
    ],
  };
}
