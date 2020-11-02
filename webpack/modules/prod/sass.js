import cssExtractPlugin from '../../helper/css-extract-plugin';
import cssLoader from '../../helper/css-loader';

export function loadSassAndScss() {
  return {
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          exclude: /node_modules/,
          use: [
            cssExtractPlugin(),
            cssLoader({ sourceMap: false }),
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
  };
}
