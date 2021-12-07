module.exports = function() {
	return {
		module: {
			rules: [{
				test: /\.woff2|woff$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				},
			}]
		}
	};
};