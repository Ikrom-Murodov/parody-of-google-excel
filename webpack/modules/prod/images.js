import fileLoader from '../../helper/file-loader';

export function loadOptimizedImages() {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|svg)$/,
          exclude: /node_modules/,
          use: [
            fileLoader({ folderName: 'images', contentHash: true }),
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
      ],
    },
  };
}
