import cssLoader from '../../helper/css-loader';

export function loadSassAndScss() {
  return {
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          exclude: /node_modules/,
          use: ['style-loader', cssLoader({ sourceMap: true }), 'sass-loader'],
        },
      ],
    },
  };
}
