//入口文件

import Vue from 'vue'

//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'

//按需求导入Mint-UI
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
//引入MUI
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/css/app.css'
import app from './App.vue'


//引入swiper
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

var vm = new Vue({
	el : '#app',
	data : {},
	methods : {},
	render : c=>c(app),
	router : router
})
