const path = require('path');

module.exports = {
  entry: './src/Vision/main.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist/Vision',
   hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist', 'Vision'),
  },
};