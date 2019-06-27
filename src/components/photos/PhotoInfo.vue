<template>
<div class="photoInfo-container">
	<div class="imgtitle">
			<h1>{{ photolist.title }}</h1>
			<div class="subtitle">
				<span>发表时间: {{ photolist.add_time | dateFormat}}</span>
				<span>点击:{{ photolist.click }}次</span>
			</div>
			<hr>
	</div>

	<!-- 缩略图区域 -->
<!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.url"> -->
	<div class="thumbs">
		<vue-preview :slides="list"></vue-preview>
	</div>


	<div class="imgcontent" v-html="photolist.content">
	</div>
	<!-- 评论子组件 -->
	<cmt-box :id="this.id"></cmt-box>

</div>


</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
	data() {
		return {
			id : this.$route.params.id,
			photolist: [],
			list : []

		}
	},
	created() {
		this.getPhotoList();
		this.getPhoto();
	},
	methods : {
		getPhotoList () {
			this.$http.get('api/getimageInfo/'+this.id).then(result=>{
				if(result.body.status == 0){
					this.photolist = result.body.message[0];
				}
			})
		},
		getPhoto () {
			this.$http.get('api/getthumimages/'+this.id).then(result=>{
				if(result.body.status ===0 ){
					result.body.message.forEach(item=>{
						item.w = 600;
						item.h = 600;
						item.msrc = item.src;
					})
					this.list = result.body.message
					console.log(this.list)
				}
			})
		},
	},
	components : {
		'cmt-box' : comment
	}
};
</script>

<style lang="scss">
.photoInfo-container{
	padding: 3px;
	.imgtitle {
		h1 {
			text-align: center;
			font-size: 16px;
			padding: 10px;
			color: #26A2FF;
		}
		.subtitle {
			display: flex;
			justify-content : space-between;
			font-size : 13px;
		}
	}
	.imgcontent {
		font-size: 13px;
		line-height: 25px;
	}
}

.thumbs {
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
  }
  figure {
    width: 100px;
    height: 100px;
    margin: 10px;
    box-shadow: 0 0 4px #999;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>

