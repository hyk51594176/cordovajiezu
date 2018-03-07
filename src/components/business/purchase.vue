<template>
    <div class="home mpurchase">
        <swiper  style="width:100%;margin:0;" :aspect-ratio="5/9"
                dots-position="center"
                v-if='busiBannerList.length>0'>
            <swiper-item class="swiper-demo-img"
                         v-for="(obj,index) in busiBannerList"
                         :key="index"
                         style="text-align:center">
                <img :src="obj.pictureUrl"
                     style="width:100%">
            </swiper-item>
        </swiper>
        <div style="height:25px"
             v-if='busiBannerList.length==0'>
    
        </div>
        <div class="mpurchase-neirong">
            <div class="mytitle">
                <div class="title-img shadow"
                     :style="{background:`url(${marker.binfoIcon}) no-repeat #fff`}">
                    <!--<img :src="marker.markerIcon">-->
                </div>
                <div class="title-biaoti">
                    <div class="tou">
                        <strong>{{marker.binfoName}}</strong>
                        <span @click='collection(marker)'
                              class='ion-star'
                              :style="{color:marker.isFavorite?'orange':'rgba(0,0,0,.3)'}" />
                    </div>
                </div>
            </div>
            <group v-if="goodsData.length!=0" >
                <div class="menu-itme" v-for="goods in goodsData" >
                    <h4>{{goods.itemName}}</h4>
                    <!--<div class="menu-itme-title">
                        <img :src="goods.itemIcon"
                             alt=""> {{goods.itemTitle}}
                    </div>-->
                    <div class="menu-itme-shujia">
                        <x-number :min="0"
                                  v-model="goods.count" @on-change="change($event,goods)"></x-number>
                        <div class="price">
                            <span class="itemprice">
                                 {{goods.currencyUnitText}} {{goods.itemPrice.toFixed(2)}}
                            </span>
                            <span>
                                 {{goods.currencyUnitText}} {{goods.discountPrice.toFixed(2)}}
                            </span>
                        </div>
                    </div>
                    
                     <div class="total vux-1px-t ">
                            <strong>
                                {{$t('purchase.total')}}:
                            </strong>
                            <span v-if='marker.typeCode=="viewspot"'>{{goods.currencyUnitText}} {{(goods.count*goods.discountPrice).toFixed(2)}}</span>
                            <div v-else>
                                {{goods.currencyUnitText}}:
                                <input v-model.number="goods.totalPrice" type="number" />
                            </div>
                
                        </div>
                </div>
    
            </group>
        </div>
    
        
      
            <x-button style="width:80%" v-if="goodsData.length!=0"
                      :style="$store.state.themestyle.theme.button"
                      @click.native='buy'>{{$t('store.purchase')}}</x-button>
    
       
        <div v-if="goodsData.length==0"
             style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
        <x-dialog v-model="showdialog"
                  class="dialog-demo"
                  :scroll="false"
                  hide-on-blur>
            <div class="seletheme">
                <img src="../../assets/image/apay.png" @click="payment('apay')">
                <img src="../../assets/image/wepay.png" @click="payment('wpay')">
            </div>
        </x-dialog>
    </div>
</template>

<script>
import {
    Swiper,
    SwiperItem,
    XNumber,
    Group,
    XButton,
    XDialog
} from 'vux'

import {
    busiItemPages,
    userFavoriteBusInfo,
    userFavoriteCancel,
    userOrderAdd,
    payGetsina
} from 'api/api';

export default {
    components: {
        Swiper,
        SwiperItem,
        XNumber,
        Group,
        XButton,
        XDialog
    },
    data() {
        return {
            goodsData: [],
            order_id: '',
            showdialog:false,
            itemList:[]
        }
    },
    created() {
        this.init()
    },
    computed: {
        marker() {
            return this.$store.state.map.marker
        },
         busiBannerList(){
               let arr=this.marker.busiBannerList||[]
               return arr.filter(obj=>{
                   return obj.bannerType === 2
               })
           }
    },
    methods: {
        init(){
            busiItemPages({ busiInfoId: this.marker.busiInfoId }).then(res => {
                let arr = res.data.obj.data||[]
                this.goodsData = arr.map(obj=>{
                    obj.count=1;
                    obj.totalPrice=(obj.count*obj.discountPrice).toFixed(2);
                    return obj;
                }) 
                
            })
        },
        change(val,obj){
            obj.count =val;
            obj.totalPrice =(obj.count*obj.discountPrice).toFixed(2)
        },
        payment(type){
           
            if(type==='wpay'){
                this.$vux.toast.show({
                    text: this.$t('nowepay'),
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })
                return
            }
             this.showdialog=false
            userOrderAdd({
                userId: this.$store.state.user.userId,
                busiInfoId: this.marker.busiInfoId,
                itemList: this.itemList,
               
            }).then(res => {
                this.getsina(res.data.obj.orderId,type)
            })
        },
        buy() {
            this.itemList= this.goodsData.filter(obj=>{
                return obj.totalPrice>0
            })

            if ( this.itemList.length===0) {
                this.$vux.toast.show({
                    text: this.$t('purchase.totalV'),
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })
                return
            }
            this.showdialog=true
            
        },
        getsina(orderId,type) {
            payGetsina({ orderId: orderId}).then(res => {
                if(type=='apay'){
                    this.apay(res.data.obj)
                }
            })
        },
        apay(sign){
          
            cordova.plugins.alipay.payment(sign, e=>{
                console.log(e)
            }, e=>{
                if(e.resultStatus == "4000"){
                    this.$vux.toast.show({
                        text:e.memo,
                        position: 'bottom',
                        type: 'text',
                        width: 'auto'
                    })
                }
            });
        },
        collection(marker) {
            if (marker.isFavorite) {
                userFavoriteCancel({
                    userId: this.$store.state.user.userId,
                    targetId: marker.busiInfoId
                }).then(res => {
                    marker.isFavorite = false
                })
            } else {
                userFavoriteBusInfo({
                    userId: this.$store.state.user.userId,
                    targetId: marker.busiInfoId,
                    favoriteTitle: marker.binfoName
                }).then(res => {
                    marker.isFavorite = true
                })

            }
        }
    }
}
</script>

<style lang="less" scoped>
.mpurchase {
    background: #efefef;
    display: flex;
    flex-direction: column;
     overflow: hidden;
     width:100%;
    justify-content: flex-start;  
      .total {
            background: #ffffff;
            display: flex;
            justify-content: space-between;
            padding: 8px;
            input {
                font-size: 20px;
                border: 0;
                border-bottom: 1px solid #efefef;
                width: 100px;
            }
        }
    
       
      
        .weui-btn {
            margin: 8px auto;
        }
 
    .mpurchase-neirong {
            overflow-y: auto;
              -webkit-overflow-scrolling: touch;
       	.price{
       		position:absolute;
       		right:15px;
       	}
       	.price span{
       		display:block;
       		text-align:right
       	}
        .mytitle {
            display: flex;
            background-color: #efefef;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 45px;
            .title-img {
                margin-top: -12px;
                margin-left: 10px;
                position: absolute;
                width: 60px;
                height: 60px;
                border-radius: 30px;
                overflow: hidden;
                background-size: 120% !important;
                background-position: center center !important
            }
            .title-biaoti {
                padding-left: 80px;
                color: #585858;
                font-size: 20px;
                 width:100%;
                .tou{
                     display: flex;
                    justify-content: space-between;
                align-items: center;
                width:100%;
                    span {
                        padding-right: 20px;
                        font-size: 25px
                    }
                }
               
            }
        }
    }
    .menu-itme {
        padding: 8px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .menu-itme-title {
            display: flex;
            align-items: center;
            img {
                width: 40px;
                margin-right: 8px
            }
        }
        .menu-itme-shujia {
            display: flex;
            align-items: right;
            color:#e85656;
            font-weight:bold;
            .itemprice {
            	margin-bottom:-3px;
                text-decoration: line-through;
                color:#666;
                font-size:14px;
                font-weight:normal
            }
        }
    }
    .seletheme {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px 0;
    img {
        // height: 60px;
        width: 100px;
        &:active {
           opacity: 0.5
        }
        //    border: 1px solid #ddd
    }
}
}
</style>