const { withRepack } = require('@callstack/repack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',  // Your app's entry point
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'auto',  // Ensure correct path for dynamic imports
    },
    mode: 'development',  // Ensure you are in development mode
    devServer: {
      port: 3001,  // The port on which the server runs
      static: {
        directory: path.join(__dirname, 'dist'),  // Serve files from the dist folder
      },
      compress: true,  // Enable gzip compression
      hot: true,  // Enable hot module replacement
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'section1',  // Name of the app
        filename: 'remoteEntry.js',  // File that will be exposed to the main app
        exposes: {
          './App': './src/App',  // Expose the App component
        },
        shared: ['react', 'react-native'],  // Shared dependencies
      }),
    ],
};

// module.exports = withRepack({
//   entry: './src/index.js',  // Section 1 entry point
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   plugins: [
//     new ModuleFederationPlugin({
//       name: 'section1',  // Name of this micro-app
//       filename: 'remoteEntry.js',  // File that will be loaded by the main app
//       exposes: {
//         './App': './src/App',  // Expose the Section 1 component to the main app
//       },
//       shared: ['react', 'react-native'],  // Shared dependencies with the main app
//     }),
//   ],
// });
