function fileLoader({ folderName = '', contentHash = false }) {
  return {
    loader: 'file-loader',
    options: {
      name: contentHash
        ? `${folderName}/[name].[contenthash].[ext]`
        : `${folderName}/[name].[ext]`,
    },
  };
}

export default fileLoader;
