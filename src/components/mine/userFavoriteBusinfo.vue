<template>
    <div id='area'
         class="home arealist"
         @scroll="lazloadin">
        <div v-for='obj in favoriterList'
             class="area" @click="goto(obj)">
            <div class="favoriteTitle">
                <div class="fav-tit">

                    {{obj.favoriteTitle}}
                </div>
                <div class="fav-con">
                     <span @click.stop='collection(obj)'
                      class='ion-star'
                      style=" font-size:25px"
                      :style="{color:obj.favorite?'orange':'rgba(0,0,0,.3)'}" />
    
                    <span class="juli">
                        {{obj.busiInfo.distance}} km
                    </span>
                </div>
            </div>
    
            <div class="btn">
                <div  >
                    {{obj.busiInfo.binfoAddr}}
                </div>
                
                    <x-button mini :style="$store.state.themestyle.theme.button"
                              @click.native.stop='daohang({lat:obj.busiInfo.binfoLatitude,lng:obj.busiInfo.binfoLongitude})'>{{$t('tabbar.map')}}</x-button>
    
               
            </div>
    
        </div>
        <div style="width:100%;text-align:center;padding-top:18px"
             v-if='favoriterList.length===0'>
            {{$t('nodata')}}
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { XButton } from 'vux'
import {
    userFavoriteBusInfo,
    userFavoriteCancel,
    userFavoriteGetByUserId
} from 'api/api';
import {
    BUSIINFO_LIST
} from 'types';
export default {
    name: 'areaList',
    data() {
        return {
            favoriterList: [],
            recordsTotal: 0,
            page: {
                length: 10,
                start: 0,
                longitude: this.$store.state.map.myPostion.lng||0,
                latitude: this.$store.state.map.myPostion.lat||0,
                userId: this.$store.state.user.userId
            }
        }
    },
    created() {
        this.init()
      
    },
    components: {
        XButton
    },
    computed: {
      markerList(){
          return this.$store.state.map.markerList
      },  
       busiInfoList(){
           return this.$store.state.busiInfo.busiInfoList
       }
    },
    methods: {
         ...mapMutations([
            'setMarker',
        ]),
        init() {
            userFavoriteGetByUserId(this.page).then(res => {
                let arr = res.data.obj.data || []
                this.favoriterList = [...this.favoriterList, ...arr]
                this.recordsTotal = res.data.obj.recordsTotal
            })
        },
        lazloadin(e) {
            if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20) {
                if(this.$store.state.isLoading)return
                if (this.favoriterList.length < this.recordsTotal) {
                    this.page.start = this.favoriterList.length;
                    this.init()
                }
            }
        },
        collection(favoriterObj) {
            const self = this
            this.$vux.confirm.show({
                title: this.$t('confirm.title'),
                content: this.$t('confirm.cancelCol'),
                confirmText:this.$t('order.sure'),	 
                cancelText:this.$t('order.cancel'),
                onConfirm () {
                    self.delecollection(favoriterObj)
                }
            })
        
          
        },
        delecollection(favoriterObj){
            userFavoriteCancel({
                userId: this.$store.state.user.userId,
                targetId: favoriterObj.busiInfo.busiInfoId
            }).then(res => {
                let index = this.favoriterList.indexOf(favoriterObj)
                this.favoriterList.splice(index,1)
                this.markerList.forEach(m=>{
                    if(m.busiInfo.busiInfoId==favoriterObj.targetId){
                        console.log( m.busiInfo.isFavorite)
                        m.busiInfo.isFavorite=false
                        console.log( m.busiInfo.isFavorite)
                        
                    }
                })
                this.busiInfoList.forEach(m=>{
                    if(m.busiInfoId==favoriterObj.targetId){
                        m.isFavorite=false
                    }
                })
                
            })
        },
        daohang(latLng) {
            plugin.google.maps.external.launchNavigation({
                "from": this.$store.state.map.myPostion.lat + "," + this.$store.state.map.myPostion.lng,
                "to": latLng.lat + "," + latLng.lng
            });
        },
        goto( favoriterObj) {
            favoriterObj.busiInfo.areaId=favoriterObj.areaId
            let busiInfo = this.busiInfoList.filter(m=>m.busiInfoId==favoriterObj.targetId)[0]|| favoriterObj.busiInfo
            this.setMarker(busiInfo)
            this.$router.push({name:'map'})
        }
    }
}
</script>
<style lang="less" scoped>
.arealist {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch
}
.favoriteTitle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fav-tit{
        overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;

    }
    .fav-con{
        width: 30%;
           display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.area {
    background: #ffffff;
    border-bottom: 1px solid #ddd;
    padding: 8px;
    margin-top: 8px;
    .btn {
        display: flex;

        justify-content: space-between;
        align-items: center;
          button{
            flex-shrink: 0;
            &:active {
                opacity: 0.3
                
            }
        }
    }
    .juli {
        float: right;
        margin-right: 8px;
        font-size: 12px;
        color: #666666
    }
}
</style>