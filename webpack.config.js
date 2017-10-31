var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var webpack = require('webpack'); 
var path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {index:'./src/client/public/index.jsx'},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer:{
    publicPath:'/',
    contentBase:'./src/client/public',
  	inline:true,
  	port:8080,
    proxy:{
    '**':{
      target:'http://localhost:3000',
      changeOrigin:true,
      secure:false
      }
    }
  },

  module: {
  loaders: [
    { 
      test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", 
		  query:{presets:['react','env','stage-3']}
    },
    { test: /\.(jpg|svg|png|gif)$/,loader: "file-loader" },
    { test: /\.css$/, use:[{loader:"style-loader"},{loader:"css-loader"}]}
  ]
}/*,
  plugins: [
new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, 
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] 
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]*/
};
