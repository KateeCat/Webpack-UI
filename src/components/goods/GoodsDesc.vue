<template>
	<div class="goodsDesc-container">
		<h4>{{goodsdes.title}}</h4>
		<hr>
		<div class="goodscontent" v-html="goodsdes.content">
		</div>
	</div>
</template>

<script>

export default  {
	data () {
		return {
			id : this.$route.params.id,
			goodsdes : []
		}
	},
	created() {
		this.getgoodsDes();
	},
	methods : {
		getgoodsDes() {
			this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
				if(result.body.status == 0){
					this.goodsdes = result.body.message[0]
				}
			})
		}
	}
};
</script>

<style lang="scss">
	.goodsDesc-container{
		h4{
			font-size: 16px;
			color:#226aff;
			text-align: center;
			padding: 15px;
		}
		.goodscontent {
			img{
				width: 100%;
			}
		}
	}
</style>
