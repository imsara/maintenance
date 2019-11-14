const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				// Pack images (e.g. when importing a dependency's css)
				test: /\.(jpe?g|png|gif|svg|ico)$/,
				use: [
					'file-loader?name=[hash].[name].[ext]',
					'image-webpack-loader?bypassOnDebug'
				]
			},
			{
				// SCSS: Compile to CSS, inject CSS in index.html (style-loader)
				test: /\.scss$/,
				use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [new HtmlWebpackPlugin({
		template: "src/index.html",
		favicon: 'src/image/favicon.ico'
	})],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		proxy: {
			'/api': {
				target: 'http://<ip>:8888',
				secure: false,
			},
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Methods': '*',
		},
	}
};