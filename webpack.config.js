const path = require('path')
const webpack = require('webpack')
//作用1：自动在内存中根据指定页面生成一个内存页面
//作用2：自动把打包好的bundle.js追加到内存中
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode:'development',
  entry : path.join(__dirname,'./src/main.js'),
  output : {
    path: path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  devServer : {
  	open:true,
  	port:3000,
 	// contentBase : path.join(__dirname,'/'),//指定托管根目录
 	// contentBase : 'src',
 	hot:true
  },
  plugins : [
  //创建了一个虚拟index.html在内存里，不再需要手动处理bundle.js的引用路径
  	new htmlWebpackPlugin({ //创建一个在内存中生成HTML页面的插件
  		template: path.join(__dirname,'./src/index.html'),
  		filename:'index.html'
  	}),
    new VueLoaderPlugin()
  ],
  module : {
  	rules: [
  	{test : /\.css$/,use:['style-loader','css-loader']},
  	{test : /\.less$/,use:['style-loader','css-loader','less-loader']},
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
  	// {test : /\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=1024&name=[name].[ext]'}
  	{ test: /\.(jpg|png|gif|bmp|jpeg)$/,loader:'url-loader',options:{limit:1000,name:'[hash:8]-[name].[ext]'}},
  	{ test: /\.(ttf|eot|svg|woff|woff2)$/,loader:'url-loader'},
    { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    { test: /\.vue$/,use : 'vue-loader'}
  	]
  },
  resolve : {
    alias : { //设置vue被导入时候包的路径
      "vue$":"vue/dist/vue.js"
    }
  }
}
