<template>
    <div class="home markerdetail">
        <div class="conner" v-if="storyData">
            <swiper height="180px"
                    dots-position="center"
                    v-if='  storyData.banners'>
                <swiper-item class="swiper-demo-img"
                             v-for="obj in storyData.banners"
                             :key="obj.articleId"
                             style="text-align:center">
                    <img :src="obj.pictureUrl"
                         style="width:100%">
                </swiper-item>
            </swiper>
    
            <div style="height:25px"
                 v-if=' !storyData.banners'>
    
            </div>
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
            <div class="neirong">
                <h4>
                        {{storyData.articleTitle}}
                    </h4> 
                    <div v-html="storyData.articleDescription"></div>
            </div>
            <x-button :style='$store.state.themestyle.theme.button'
                      style="width:80%;margin:5px auto"
                      @click.native="$router.push({name:'storyRelated',params:{title:storyData.articleTitle}})">
                site's articles
            </x-button>
            <div class="neirong">
                <h4>
                        Tourlst sopt story
                    </h4> chon from where they continued their fight against the combined Korean..
            </div>
        </div>
        <div v-if="!storyData" style="width:100%;text-align:center;padding-top:18px">
             {{$t('nodata')}}
        </div>
        <nav class="mtabar"
             :style='$store.state.themestyle.theme.tabbar'>
            <router-link :to="{name:'store'}"
                         tag='div'
                         class="tab-store">
                <p> {{ $t('store.title')}}</p>
            </router-link>
            <div @click='daohang'
                 tag='div'
                 class="navigation">
    
                <p>{{ $t('tabbar.map')}}</p>
            </div>
            <router-link :to="{name:'help'}"
                         tag='div'
                         class="help">
                <p>{{ $t('tabbar.bangzhu')}}</p>
            </router-link>
            <router-link :to="{name:'mission'}"
                         tag='div'
                         class="mission">
                <p>{{ $t('mission.title')}}</p>
            </router-link>
        </nav>
    </div>
</template>

<script>
import {
    XButton,
    Swiper,
    SwiperItem
} from 'vux'

import {
    appGetStory,
    appGetCartoon,
    userFavoriteBusInfo,
    userFavoriteCancel
} from 'api/api';


export default {
    name: 'markerDetail',
    computed: {
        marker() {
            return this.$store.state.map.marker
        },

    },
    data() {
        return {
            storyData: {}
        }
    },
    components: {
        XButton,
        Swiper,
        SwiperItem
    },
    created() {

        if (this.$route.params.type === 'story') {
            appGetStory({ areaId: this.marker.areaId }, false).then(res => {
                this.storyData = res.data.obj
            })
        } else {
            appGetCartoon({ areaId: this.marker.areaId }, false).then(res => {
                this.storyData = res.data.obj
            })
        }
    },
    methods: {

        daohang() {
            plugin.google.maps.external.launchNavigation({
                "from": this.$store.state.map.myPostion.lat + "," + this.$store.state.map.myPostion.lng,
                "to": this.marker.position.lat + "," + this.marker.position.lng
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

<style lang="less">
.markerdetail {
    background-color:#efefef;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .conner {
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch; // padding-bottom: 60px;
    }

    .binfoName {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
   .neirong {
        margin-bottom:4px;
        padding:7px 15px;
        background-color:#fff;
        border-bottom:1px solid #c0c0c0;
        line-height:1.4;
        h4{
        	color:#02a1ab;
        }
    }

    .mytitle {
        display: flex;
        background-color: #efefef;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 45px;
        position: relative;
        .title-img {
            margin-top: -12px;
            margin-left: 10px;
            display: block;
            position: absolute;
            width: 60px;
            height: 60px;
            float: left;
            border-radius: 30px;
            overflow: hidden;
            background-size: 120% !important;
            background-position: center center !important
        }
        .title-biaoti {
            padding-left: 80px;
            text-align: left;
            color: #585858;
            font-size: 20px;
            span {
                display: block;
                position: absolute;
                margin-top: -35px;
                right: 10px;
                font-size: 25px
            }
        }
    }
}
</style>