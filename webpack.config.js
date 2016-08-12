const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = config = {
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
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: []
};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(
    new DotenvPlugin({
      sample: './.sample-env',
      path: './.env'
    })
  )
}
