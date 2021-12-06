module.exports = function() {
	return {
		module: {
			rules: [{
				test: /\.(jpe?g|png)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]'
					// filename: 'images/[name][hash][ext]'
				},
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/icons/[name][hash][ext]'
				},
				use: [{
					loader: 'svgo-loader',
					options: {
						plugins: [{
							name: 'cleanupIDs',
							active: false
						}]
					}
				}]
			}
			]
		}
	};
};