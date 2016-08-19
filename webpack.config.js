const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: '#source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new DotenvPlugin({
      sample: './.sample-env',
      path: './.env'
    })
  ]
};
