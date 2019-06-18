//入口文件

import Vue from 'vue'

//按需求导入Mint-UI
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
//引入MUI
import './lib/mui/css/mui.min.css'
import app from './App.vue'

var vm = new Vue({
	el : '#app',
	data : {},
	methods : {},
	render : c=>c(app)
})
