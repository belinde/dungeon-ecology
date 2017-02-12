module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: './dist',
        library: 'DungeonEcology'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }]
    }
}
