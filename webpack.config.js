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
    rules: [
    { 
		test: /\.jsx?$/,
		exclude: /node_modules/,
		loader:"babel-loader", 
		options:{
			presets:['react','env','stage-3'],
			plugins:['transform-class-properties']
		}
	//	plugins:['transform-class-properties']
    },
    { test: /\.(jpg|png|gif)$/,loader: "file-loader" },
    { test: /\.css$/, use:[{loader:"style-loader"},{loader:"css-loader"}]}
  ]
}
/*
,
  plugins: [
    new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ]
*/
};






