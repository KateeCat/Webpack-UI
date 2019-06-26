// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

import Vuex from 'vuex'
Vue.use(Vuex)


var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
	state :{
		car: car
	},
	mutations : {

		addToCar(state,goodsinfo){
			// console.log(goodsinfo.count)
			var flag = false //判断有没有
			state.car.some(item => {
				if(item.id == goodsinfo.id){
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true
				}
			})
			if(!flag) {
				state.car.push(goodsinfo)
			}
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))

		},
		delGoodsInfo(state,id){
			state.car.some((item,i)=>{
				if(item.id == id){
					state.car.splice(i,1)
					return true
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		}
	},
	getters : {
		getAllcount (state) {
			var c = 0;
			state.car.forEach(item=>{
				c+=item.count
			})
			return c
		},
		getGoodsCount(state){
			var goods = {};
			state.car.forEach(item=>{
				goods[item.id] = item.count
			})
			return goods
		},
		getGoodsSelected(state){
			var goods = {}
			state.car.forEach(item=>{
				goods[item.id] = item.selected
			})
			return goods
		},
		getSum(state){
			var o = {
				count : 0,
				amount : 0
			}
			state.car.forEach(item=>{
				if(item.selected){
					o.count+=item.count
					o.amount+=item.price * item.count
				}
			})
			return o
		}
	}
})


//  导入 vue-resource
import VueResource from 'vue-resource'
//  安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 1.3 导入自己的 router.js 路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})
