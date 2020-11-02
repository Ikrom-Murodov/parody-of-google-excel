import fileLoader from '../../helper/file-loader';

export function loadImages() {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|svg)$/,
          exclude: /node_modules/,
          use: [fileLoader({ folderName: 'images' })],
        },
      ],
    },
  };
}
