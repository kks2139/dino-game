const path = require('path');

module.export = {
    mode: 'none',
    entry: {
        bundle: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname + '/build')
    },
    devServer: {
        static: path.resolve(__dirname + '/build'),
        port: 4000
    },
    module: {
        rules: []
    }
}