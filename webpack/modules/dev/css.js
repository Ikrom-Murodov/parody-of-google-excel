import cssLoader from '../../helper/css-loader';

export function loadCss() {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', cssLoader({ sourceMap: true })],
        },
      ],
    },
  };
}
