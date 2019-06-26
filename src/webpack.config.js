var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: path.join(__dirname,'./main.js'),
	output: {
		path: path.join(__dirname,'./dist'),
		filename: 'bundle.js'
	},
	plugins: [
	new htmlWebpackPlugin({
		template: path.join(__dirname,'./index.html'),
		filename : 'index.html'
	})
	]
}
