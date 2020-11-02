import fileLoader from '../../helper/file-loader';

export function loadFonts() {
  return {
    module: {
      rules: [
        {
          test: /\.(woff2|woff|eot|ttf)$/,
          use: [fileLoader({ folderName: 'fonts' })],
        },
      ],
    },
  };
}
