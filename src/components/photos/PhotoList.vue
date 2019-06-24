<template>
<div>
<!-- 顶部滑动 -->
 <div id="slider" class="mui-slider">
	<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
		<div class="mui-scroll">
		<a :class="['mui-control-item' , item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id">
		{{ item.title }}</a>
		</div>
	</div>
</div>
<!-- 图片区域 -->
<div class="imgarea">
	<ul>
	  <router-link :to="'/home/PhotoInfo/'+item.id" v-for="item in list" :key="item.id"  tag="li">
	    <img v-lazy="item.img_url">
	    <div class="imgbox">
	    	<div class="imgtitle"><h1>{{item.title}}</h1></div>
	    	<div class="imgbody">{{item.zhaiyao}}</div>
	    </div>
	  </router-link>
	</ul>
</div>

</div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
	data(){
		return{
			cates: [],
			list: []
		}
	},
	created() {
		this.getAllCategory();
		this.getPhotoList(0);
	},
	mounted() {
	    //  初始化滑动控件
	    mui(".mui-scroll-wrapper").scroll({
	      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	    });
	},
	methods: {
		getAllCategory () {
			this.$http.get('api/getimgcategory').then(result=>{
				if(result.body.status == 0){
					result.body.message.unshift({ title: "全部", id :0 })
				}
				this.cates = result.body.message;
			})
		},
		getPhotoList (cateId) {
			this.$http.get('api/getimages/'+ cateId).then(result =>{
				if(result.body.status == 0){
					this.list = result.body.message;
				}
			})
		}
	},

};


</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
}
.imgarea {
	padding: 0px 10px;
	ul {
		list-style: none;
		li {
			position: relative;
			margin : 5px 0px;
			background-color: #ccc;
			box-shadow: 0 0 3px #ccc;
			img {
				width: 100%;
				vertical-align: middle;
			}
		    img[lazy="loading"] {
		      width: 40px;
		      height: 300px;
		      margin: auto;
		    }

		    .imgbox {
		    	position: absolute;
		    	bottom: 0px;
		    	background: rgba(0,0,0,0.4);
		    	color: #fff;
		    	max-height: 82px;
		    	padding: 4px 2px;
				.imgtitle{
					h1 {
					font-size: 13px;
					}
				}
				.imgbody{
					font-size: 12px;
				}
		    }
		}
	}
}



</style>
