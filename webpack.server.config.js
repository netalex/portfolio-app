const webpack = require('webpack');

module.exports = {
  target: 'node', // Ambiente Node.js
  plugins: [
    // Ignora il modulo fs, necessario solo per Node.js puro
    new webpack.IgnorePlugin({ resourceRegExp: /^fs$/ }),
    new webpack.IgnorePlugin({ resourceRegExp: /lokijs/ }) // Ignora completamente lokijs per la build SSR
  ]
};
