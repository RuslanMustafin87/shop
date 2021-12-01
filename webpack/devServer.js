const path = require('path');
const webpack = require('webpack');
const config = require('../config.json');

module.exports = function() {
	return {
		devServer: {
			historyApiFallback: true,
			static: {
				directory: path.join(__dirname, '../assets/'),
			},
			open: true,
			compress: true,
			port: config.PORT,
			hot: true
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
		],
	};
};