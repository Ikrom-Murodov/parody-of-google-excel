import cssExtractPlugin from '../../helper/css-extract-plugin';
import cssLoader from '../../helper/css-loader';

export function loadCss() {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            cssExtractPlugin(),
            cssLoader({ sourceMap: false }),
            'postcss-loader',
          ],
        },
      ],
    },
  };
}
