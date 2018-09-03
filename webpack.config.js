const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

const IS_DEV = process.env.NODE_ENV === 'development'
const SRC_PATH = path.resolve(__dirname, 'src')
const BUILD_PATH = path.resolve(__dirname, 'build')
const STATIC_PATH = path.resolve(__dirname, 'static')

module.exports = {
	entry: './src/app.ts',

	resolve: {
		extensions: [ '.ts' ],
		modules: [
			SRC_PATH,
			'node_modules',
		],
	},

	output: {
		filename: 'bundle.js',
		path: BUILD_PATH,
	},

	plugins: [
		new CheckerPlugin(),
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new CopyWebpackPlugin([ { from: STATIC_PATH, to: BUILD_PATH } ]),
	].concat(IS_DEV ? [
		new webpack.LoaderOptionsPlugin({ debug: true }),
		new webpack.NoEmitOnErrorsPlugin(),
	] : [
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: true } }),
	]),

	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
		]
	},
}
