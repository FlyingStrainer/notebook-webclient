var webpack = require("webpack");

module.exports = {
    entry: "./source/javascripts/source/app.js",
    
    output: {
        path: "./source/javascripts/build",
        filename: "site.js"
    },

    module: {
		loaders: [
      { test: /\.jst/, loader: "dot-loader" },
			{
				test: /\.jsx?$/,
            	exclude: /(node_modules)/,
            	loader: 'babel',
            	query: {
            		presets: ['react', 'es2015']
            	}
			}
		]
	},

    plugins: [

        /* 
            Uncomment below to get rid of development warnings 
        */
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
}
