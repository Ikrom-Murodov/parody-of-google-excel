export default function cssLoader({ sourceMap = false }) {
  return {
    loader: 'css-loader',
    options: {
      sourceMap,
    },
  };
}
