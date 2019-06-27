<template>
  <div class="shopcar-container">
    <div class="goods-list">

      <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" >
              <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
              <img :src="item.thumb_path" alt="">
              <div class="info">
                <h1>{{ item.title }}</h1>
                <p>
                  <span class="price">¥{{item.sell_price}}</span>
                  <numbox class="numbox" :getcount="$store.getters.getGoodsCount[item.id]" :goodsid='item.id'></numbox>
                  <a href="#" @click.prevent="remove(item.id,index)">删除</a>
                </p>
              </div>
          </div>

        </div>
      </div>

    <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner getSum">
           <div class="left">
             <p>总计（不含运费）</p>
             <p>已勾选商品 <span class="red">{{$store.getters.getSum.count}}</span> 件, 总价 <span class="red">¥{{$store.getters.getSum.amount}}</span></p>
           </div>
          <mt-button type="danger" @click="goCheck($store.getters.getSum.amount)">去结算</mt-button>
          </div>
          <!-- <p>{{$store.getters.getGoodsSelected}}</p> -->
          <!-- <p>{{$store.getters.getSum}}</p> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
  data(){
    return{
      goodslist:[],

    }
  },
  created() {
    this.getGoodsList()
  },
  methods : {
    getGoodsList(){
      var idArr=[]
      this.$store.state.car.forEach(item=>idArr.push(item.id))
      if(idArr.length<=0){
        return;
      }
      this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
          if(result.body.status == 0){
            this.goodslist = result.body.message
          }
      })
    },
    remove(id,index){
      MessageBox.confirm('',{
      title: '提示',
      message: '您确定要删除此商品?',
      showCancelButton: true,
    }).then(action=>{
        if(action == 'confirm'){
         this.goodslist.splice(index,1);
         this.$store.commit("delGoodsInfo",id)
       }
     }).catch(err=>{
        if(err == 'cancel'){
          this.$router.go(-1)
        }
       })


    },
    selectedChanged(id,val){
      this.$store.commit('updateGoodsSelected',{id,selected:val})
    },
    goCheck(sum) {
      alert('总价为:'+sum)
    }

  },
  components : {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container{
  background-color: #eee;
  overflow: hidden;

  justify-content :space-between;
    .mui-card-content-inner{
    display: flex;
    align-items: center;
    }
    .goods-list {
      img {
        width: 60px;
        height: 60px;
        padding: 5px;
      }
      .info {
        display: flex;
        flex-direction:column;
        justify-content: space-between;
          h1{
            font-size: 14px;
            padding: 5px;
          }
          .price {
            font-size: 13px;
            color: red;
            font-weight: bold;
          }
          .numbox {
            height: 25px;
          }
      }
    }
    .getSum {
      display: flex;
      justify-content:space-between;
      align-item:center;
    }
    .red {
      color: red;
      font-weight: bold;
      font-size: 14px;
    }
}
</style>
