const path = require('path');
const webpack = require('webpack');

module.exports = function() {
	return {
		devServer: {
			historyApiFallback: true,
			static: {
				directory: path.join(__dirname, '../assets/'),
			},
			open: true,
			compress: true,
			port: 8080,
			hot: true
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
		],
	};
};