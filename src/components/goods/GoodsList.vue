<template>
	<div class="goodslist">
		<div class="goodsItem" v-for="(item,index) in goodslist" :key="index" @click="goDetail(item.id)">
			<div class="goods-top">
				<img :src="item.img_url" alt="">
				<p>{{item.title}}</p>
			</div>
			<div class="goods-bottom">
				<p class="price">
					<span class="now">¥{{item.sell_price}}</span>
					<span class="old">¥{{item.market_price}}</span>
				</p>
				<p class="subtitle">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>

export default {
	data(){
		return {
			pageindex : 1,
			goodslist: []
		}
	},
	created(){
		this.getGoodsList();
	},
	methods:{
		getGoodsList(){
			this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
				if(result.body.status == 0){
					this.goodslist =this.goodslist.concat(result.body.message);
				}
			})
		},
		getMore (){
			this.pageindex++;
			this.getGoodsList();
			console.log(this);
		},
		goDetail (id) {
			this.$router.push('/home/goodsinfo/'+id)
		}
	}
};

</script>

<style lang="scss">
.goodslist {
	display: flex;
	flex-wrap:wrap;
	padding: 2px 8px;
	justify-content:space-between;
	.goodsItem {
		width: 49%;
		display: flex;
		justify-content: space-between;
		flex-direction : column;
		border:1px solid #ccc;
		box-shadow : 0 0 0 2px #eee;
		margin:5px 0px;
		.goods-top {
			background-color: #fff;
			text-align: center;
			p {
				color: #000;
				font-size: 14px;
			}
			img {
				width: 100%;
			}

		}
		.goods-bottom{
			background-color: #eee;
			padding: 10px 10px 0px 10px;
			margin: 0px;
			.price {
				.now {
					color: red;
					font-size: 16px;
				}
				.old {
					color: #666;
					font-size: 10px;
					margin-left: 10px;
					text-decoration: line-through;
				}
			}
			.subtitle {
				display: flex;
				justify-content:space-between;
			}
		}

	}
}
</style>
