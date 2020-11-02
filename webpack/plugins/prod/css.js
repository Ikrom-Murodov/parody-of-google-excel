import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function setupCss() {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      }),
    ],
  };
}
