<template>
    <div class="home mstore">
        <div v-if="goodsData.length==0"
             style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
        <div class="store vux-1px-b"
             v-for='obj in goodsData'
             v-else>
            <h4>{{obj.itemName}}</h4>
            <div class="store-conner">
                <div class="store-tit">
                    <img :src="obj.itemIcon">
                   {{obj.itemTitle}}
                </div>
                <div style="min-width:60px;text-align:center">
                        <p class="itemprice"> 
                            {{obj.currencyUnitText}} 
                            {{obj.itemPrice.toFixed(2)}}
                        </p>
                            <p> 
                            {{obj.currencyUnitText}} 
                            {{obj.discountPrice.toFixed(2)}}
                        </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    busiItemPages
} from 'api/api';
export default {
    data() {
        return {
            goodsData: []
        }
    },
    computed: {
        marker() {

            return this.$store.state.map.marker
        }

    },
    created() {
        
        busiItemPages({ busiInfoId: this.marker.busiInfoId }).then(res => {
            this.goodsData = res.data.obj.data
 
        })
    },
}
</script>
<style lang="less">
.mstore {}

.store {
    .itemprice{
        text-decoration:line-through;
        color: red
    }
    padding: 8px;
    background: #ffffff;
    .store-conner {
        display: flex;
        align-items: center;
        justify-content: space-between;
      margin-top: 5px;
      .store-tit{
        display: flex;
        justify-content: cnter;
        align-items: center;
        img{
            width: 50px;
            margin-right: 8px;
            flex-shrink: 0;
            flex-grow:0;
        }
      }
    }
}
</style>