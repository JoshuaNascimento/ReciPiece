var path = require('path');

module.exports = {
    entry: './src/client/src/App.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
};