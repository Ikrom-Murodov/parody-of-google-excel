import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export function cleanBuildDirectory() {
  return {
    plugins: [new CleanWebpackPlugin({ verbose: false })],
  };
}
