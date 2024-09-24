const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin

module.exports = {
  entry: './src/index.ts', // Entry point for the application
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the output directory before each build
  },
  mode: 'development', // Set mode to development
  resolve: {
    extensions: ['.ts', '.js'], // Resolve .ts and .js extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match .ts files
        use: 'ts-loader', // Use ts-loader for TypeScript files
        exclude: /node_modules/, // Exclude node_modules directory
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DySofTech', // Title of the generated HTML file
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve content from this directory
    compress: true, // Enable gzip compression
    port: 9000, // Port to run the server on
    hot: true, // Enable hot module replacement
  },
};
