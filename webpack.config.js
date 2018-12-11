var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var webpack = require('webpack'); 
var path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: { index:'./src/client/public/index.jsx'},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
		publicPath :'/',
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
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use : [
					{
						loader : 'babel-loader',
						options : {
							presets:['@babel/preset-react','@babel/preset-env'],
							plugins:['transform-class-properties']
						}

					}
				]
			},
			{ 
				test: /\.(svg|jpg|png|gif)$/,
      	use: [
        	{
          	loader: "file-loader",
          	options: {
            	name: '[name].[ext]'
          	}
        	}
      	]
    	},
    	{ 
				test: /\.css$/, 
				use:[{loader:"style-loader"},{loader:"css-loader"}]}
  	]
	}
/*
,
  plugins: [
    new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
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






