const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/dist'),
		// publicPath allows you to specify the base path for all the assets within your application.
		publicPath: '/'
	},
	module:{
		rules:[{
			test: /\.js$/,
			exclude: [/node_modules/,/dist/,/.vscode/,/assets/],
			loader: 'babel-loader'
		},
		{
			test: /\.css$/,
			exclude: [/node_modules/,/dist/,/.vscode/,/assets/],
			use: [ 'style-loader', 'css-loader' ]
		},
		{
			test: /\.(png|svg|jpg|gif)$/,
			exclude: [/node_modules/,/dist/,/.vscode/],
        	use: ['file-loader']
		}
		]
	},
	devServer: {
		// historyAPIFallback will redirect 404s to /index.html.
    historyApiFallback: true,
  },
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin(
			{template: path.join(__dirname,'/src/index.html')}
		),		
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					name: 'vendor',
					chunks: 'all',
					test: /node_modules/,
				}
			}
		}
	}
}
