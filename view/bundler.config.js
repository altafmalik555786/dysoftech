const path = require('path');

module.exports = {
  // Entry point of the application, pointing to the index.ts file
  entry: path.resolve(__dirname, 'src', 'index.ts'),

  // Output configuration for the bundled file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },

  // Babel configuration for transforming files
  babel: {
    presets: [
      '@babel/preset-env', // Enables modern JavaScript transformations
      '@babel/preset-typescript', // Transforms TypeScript files
    ],
    plugins: ['@babel/plugin-transform-modules-commonjs'], // Transforms ES modules to CommonJS
  },

  // Watch settings for hot reloading or live reloading
  watch: {
    enabled: true, // Set to false if you don't want the bundler to watch files
    paths: ['src/**/*.js', 'src/**/*.ts'], // Paths to watch for changes
  },

  // Minification settings using Terser
  minify: {
    enabled: true, // Enable or disable minification
    options: {
      compress: true,
      mangle: true,
    },
  },

  // Server settings for live reload / Hot Module Replacement (HMR)
  server: {
    enabled: true,
    port: 8080,
  },

  // Asset management settings for handling CSS, images, etc.
  assets: {
    styles: {
      enabled: true,
    },
    images: {
      enabled: true,
    },
  },

  // Any additional custom plugins or configurations you want to include
  plugins: [],
};
