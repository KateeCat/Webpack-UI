<template>
	<div class="app-container">
		<!-- 顶部header区域 -->
		<mt-header class="mui-bar mui-bar-nav " fixed  title="小吕测试项目"  >
  			<span to="/" slot="left">
   			 <mt-button icon="back" @click="goBack" v-show="flag">返回</mt-button>
  			</span>
  			<!-- <mt-button icon="more" slot="right"></mt-button> -->
		</mt-header>
		<!-- 中间路由router-view区域 -->
		<transition>
			<router-view></router-view>
		</transition>

		<!-- 底部Tabbar区域 -->

		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllcount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
		</nav>
	</div>

</template>

<script>
import mui from './lib/mui/js/mui.min.js'
mui('body').on('click','a',function(){document.location.href=this.href;});

export default {
	data(){
		return{
			flag : false
		}
	},
	created() {
		this.flag = this.$router.path ==='/home' ? false : true

	},
	methods : {
		goBack () {
			this.$router.go(-1);
		}
	},
	watch : {
		'$router.path':function(newVal){
			if(newVal == '/home'){
				this.flag = false;
			}else {
				this.flag = true;
			}
		}
	}

};
</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.mint-header{
	color: #000;
}
.mint-header-title{
    text-align: center;
    white-space: nowrap;
    color: #000;
}
</style>
