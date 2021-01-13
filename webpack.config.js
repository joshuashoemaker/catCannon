const path = require('path');

module.exports = {
  entry: './src/app.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
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
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
};