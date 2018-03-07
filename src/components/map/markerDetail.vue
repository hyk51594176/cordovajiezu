<template>
    <div class="home markerdetail">
        <div class="conner">

            <swiper style="width:100%;margin:0;" :aspect-ratio="5/9" dots-position="center" v-if=' busiBannerList.length>0'>

                <swiper-item class="swiper-demo-img" v-for="(obj,index) in busiBannerList" :key="index" style="text-align:center">
                    <img :src="obj.pictureUrl" style="width:100%">
                </swiper-item>
            </swiper>
            <div style="height:25px" v-if='busiBannerList.length==0'>

            </div>
            <div class="mytitle">
                <div class="title-img shadow" :style="{background:`url(${marker.binfoIcon}) no-repeat #fff`}">
                </div>
                <div class="title-biaoti">
                    <div class="tou">
                        <div style="font-size:13px">
                            {{marker.binfoAddr}}
                            <br>
                            {{marker.tel||''}}
                        </div>
                        <span @click='collection(marker)' class='ion-star' 
                        :style="{color:marker.isFavorite?'orange':'rgba(0,0,0,.3)'}" />
                    </div>
                </div>
            </div>
            <div class="neirong">
                <div v-html='marker.binfoDescription'>
                    
                </div>
            </div>
 
            <x-button class='btn-article' :style='$store.state.themestyle.theme.button' v-if="sotryList.length>0&&marker.typeCode=='viewspot'" style="width:80%;margin:5px auto"
             @click.native="goDetail" >
               {{$t('cartoon.title')}}{{sotryList.length>1?'('+sotryList.length+')':''}}
            </x-button>
        </div>
        <nav class="mtabar" :style='$store.state.themestyle.theme.tabbar'>
            <router-link :to="{name:'store'}" tag='div' class="tab-store"    v-show="!marker.buyFlag">
                <p> {{ $t('store.title')}}</p>
            </router-link>
            <div @click='daohang' tag='div' class="navigation">
    
                <p>{{ $t('tabbar.map')}}</p>
            </div>
            <!--<router-link :to="{name:'help'}" tag='div' class="help" style=" position: relative">
                    <badge :text="$store.state.help.unread" v-show="$store.state.help.unread" class="shansuo"></badge>
                <p>{{ $t('tabbar.bangzhu')}}</p>
            </router-link>-->
             <div @click="missionDetail"
                         tag='div'
                         class="mission" >
                <p>{{ $t('mission.title')}}</p>
             </div>
             <!--<router-link :to="{name:'purchase'}"
                         tag='div'
                        v-show="marker.buyFlag" 
                         class="purchase"  >
                <p>{{ $t('store.purchase')}}</p>
            </router-link>-->
           
        </nav>
    </div>
</template>

<script>
    import {
        XButton,
        Swiper,
        SwiperItem,
        Badge
    } from 'vux'
     import {
        userFavoriteBusInfo,
        userFavoriteCancel,
        appGetCartoon
    } from 'api/api';
    
    export default {
        name: 'markerDetail',
        computed: {
            marker() {
                return this.$store.state.map.marker
            },
             missionList(){
                return this.$store.state.mission.missionList
            },
           busiBannerList(){
               let arr=this.marker.busiBannerList||[]
               return arr.filter(obj=>{
                   return obj.bannerType === 1
               })
           }
        },
        data(){
            return {
                sotryList:[]
            }
        },
        components: {
            XButton,
            Swiper,
            SwiperItem,
            Badge
        },
        created(){
          
            appGetCartoon({areaId:this.marker.areaId},false).then(res=>{
                    this.sotryList=res.data.obj.data
            })
        },
        methods: {
           goDetail(){
               if(this.sotryList.length==1){
                    this.$router.push({path:'/storyRelated',query:{title:this.sotryList[0].articleTitle,articleId:this.sotryList[0].articleId}})
               }else{
                    this.$router.push({path:'/cartoon',query:{isQuery:true}})
               }
           },
            daohang() {
                plugin.google.maps.external.launchNavigation({
                    "from": this.$store.state.map.myPostion.lat + "," + this.$store.state.map.myPostion.lng,
                      "to": (this.marker.lat||this.marker.binfoLatitude) + "," + (this.marker.lng||this.marker.binfoLongitude)
                });
            },
            collection(marker) {
                  if(marker.isFavorite){
                   userFavoriteCancel({
                         userId:this.$store.state.user.userId,
                        targetId:marker.busiInfoId
                    }).then(res=>{
                        marker.isFavorite = false
                    })
                 }else{
                    userFavoriteBusInfo({
                        userId:this.$store.state.user.userId,
                        targetId:marker.busiInfoId,
                        favoriteTitle:marker.binfoName
                    }).then(res=>{
                        marker.isFavorite = true
                    })
                  
                 }
            },
            missionDetail(){
                
                this.missionList.forEach( mission=> {
                    if(this.marker.areaId===mission.areaId){
                        this.$store.commit('setActiveMisson',mission)
                    }
                });
                this.$router.push({name:'acceptmission'})
            }
        }
    }
</script>

<style lang="less">
    .markerdetail {
    	background-color:#efefef;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      
        .help{
            position: relative;  
        .vux-badge {
                position: absolute;
                top: 0px;
                // right: 0px;
            }
        }
        .conner {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            // padding-bottom: 60px;
        }
  
     .article{
              overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    .neirong {
        margin-bottom:4px;padding:7px 15px;
        background-color:#fff;
        border-bottom:1px solid #c0c0c0;
        line-height:1.4;
       
        h4{
        	color:#02a1ab;
        }
    }
    
    .mytitle {
        display: flex;
        background-color:#efefef;
        align-items: center;
        justify-content: flex-start;
        width: 100%;height:45px;
         position: relative;
        .title-img {
            margin-top:-12px;margin-left:10px;
            display:block;
            position:absolute;
            width:60px;height:60px;
            float:left;
            border-radius:30px;
            overflow:hidden;
            background-size:120% !important;
            background-position:center center !important
        }
        .title-biaoti {
            padding-left:80px;padding-right:15px;
            text-align: left;
            color:#164c82;
            font-size:16px;
            line-height:1.5;
            span{
            	display:block;
				position:absolute;
				margin-top:-28px;right:10px;
                font-size:25px
            }
        }
    }
  }
</style>