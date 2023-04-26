const path = require('path');

module.exports = {
  entry: './src/index.js', // path to the entry file
  output: {
    filename: 'bundle.js', // name of the output file
    path: path.resolve(__dirname, 'dist'), // path to the output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // regex to match file extensions
        exclude: /node_modules/, // directories to exclude
        use: {
          loader: 'babel-loader', // name of the loader to use
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // list of babel presets to use
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // list of file extensions to resolve
  },
};
