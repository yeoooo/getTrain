const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({ patterns: [{ from: 'public/assets', to: 'assets/' }] })
],
  devServer: {
  static: {
    directory: path.join(__dirname, 'public')
  },
  compress: true,
    host: 'localhost',
    port: 3000
}
};