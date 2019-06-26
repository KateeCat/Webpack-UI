<template>
	<div class="goodsinfo-container">
		<transition
		 @before-enter="beforeEnter"
		 @enter="enter"
		 @after-enter="afterEnter"
		>
			<div class="ball" v-show="ballFlag" ref="ball">
			</div>
		</transition>
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">{{ goodsInfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价：<del>¥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;&nbsp;
							销售价：<span class="now">¥{{goodsInfo.sell_price}}</span>
						</p>
						<p>购买数量：<numbox @getnumber="getSelectedNumber" :max="goodsInfo.stock_quantity"></numbox>
						</p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
					</div>
				</div>
			 </div>
			<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsInfo.goods_no}}</p>
						<p>库存情况：{{goodsInfo.stock_quantity}}</p>
						<p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
				</div>
			</div>
	</div>




</template>

<script>

import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/numbox.vue'
	export default {
		data() {
			return {
				id : this.$route.params.id,
				lunbotu:[],
				goodsInfo:{},
				ballFlag: false,
				selectedCount: 1
			}
		},
		created() {
			this.getLunboTu();
			this.getgoodsInfo();
		},
		methods : {
			getLunboTu() {
				this.$http.get('api/getthumimages/'+this.id).then(result=>{
					if(result.body.status == 0){
						result.body.message.forEach(item=>{
							item.img = item.src //追加一项
						})
						this.lunbotu = result.body.message;
					}
				})
			},
			getgoodsInfo () {
				this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
					if(result.body.status == 0){
						this.goodsInfo = result.body.message[0]
					}
				})
			},
			goDesc (id) {
				this.$router.push('/home/goodsdesc/'+id)
			},
			goComment (id){
				this.$router.push('/home/goodscomment/'+id)
			},
			beforeEnter(el){
				el.style.transform = "translate(0,0)"
			},
			enter(el,done){

				var ballPosition = this.$refs.ball.getBoundingClientRect();
				var badgePosition = document.getElementById('badge').getBoundingClientRect();
				var x = badgePosition.left - ballPosition.left;
				var y = badgePosition.top - ballPosition.top;

				el.style.transform = `translate(${x}px,${y}px)`;
				el.style.transition = "all 0.5s cubic-bezier(1,.41,.83,.61) ";
				done()
			},
			afterEnter(el){
				this.ballFlag = !this.ballFlag
			},
			getSelectedNumber(number){
				this.selectedCount = number
				console.log('父组件得到的'+this.selectedCount)
			},
			addCar () {
				console.log(this.goodsInfo)
				this.ballFlag = !this.ballFlag;
				var goodsinfo = {
					id:this.id,
					count:this.selectedCount,
					price:this.goodsInfo.sell_price,
					selected:true};

				this.$store.commit("addToCar",goodsinfo);


			}
		},
		components : {
			swiper,
			numbox
		}

	};


</script>
<style lang="scss" scoped>
body,html {

	margin:0;
	padding: 0;
}
.goodsinfo-container{
	background-color: #eee;
	overflow: hidden;
		.price {
			.now {
				color: red;
				font-size: 16px;
				font-weight: bold;
			}
		}


		.mui-card-footer{
			display: block;
			button {
				margin:10px 0;
			}
		}

		.ball {
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: red;
			position:absolute;
			z-index: 99;
			top: 390px;
			left: 148px;
		}
}
</style>

