<template>
    <div>
        <div id="map"
             :style='styles'>
            <div class="serachdiv " :style="{width:searchShow?'90%':'50px'}"  >
                <span class="seachicon ion-ios-search"
                       @click='searchClick'
                      :style="{color:$store.state.themestyle.theme.themeColor}" />
                <input id="serch"
                :style="{width:searchShow?'60%':'0px'}"
                       type="search"
                       v-model.trim='searchValue'
                       @keyup.13="onEnter" />
                <!--<span class="seachicon ion-navicon"
                      style="font-size:33px;"
                      @click='gohome'
                      :style="{color:$store.state.themestyle.theme.themeColor}">
                            </span>-->
            </div>
    
            <div class="satrtmission ion-camera shansuo"
                 @click='satrtmission'
                 v-show="ARbtn"
                 :style="$store.state.themestyle.theme.button">
    
            </div>
            <div class="location"
                 @click='location'
                 :style="$store.state.themestyle.theme.button">
                <span class="ion-android-locate"
                      style="font-size:25px"></span>
            </div>
            <div></div>
            <div class="swpier"
                 v-show='swipershow'>
                <transition name="vux-popup-spwier">
                    <swiper height="130px"
                           
                            :show-dots='false'
                            v-model='index'>
                        <div class="button shadow ion-chevron-left"
                             @click='prv'
                             style="left:5px;top:50px;text-align:center"
                             :style="$store.state.themestyle.theme.button">
                        </div>
                        <swiper-item class="swiper-img"
                                     v-for="(marker,i) in markerList"
                                     :key='marker.busiInfo.busiInfoId'>
                            <div class="itme-div">
                                <div class="itme-div-title">
                                    <span :style="{color:$store.state.themestyle.theme.themeColor}">{{marker.busiInfo.binfoName}}</span>
                                    <span @click='collection(marker.busiInfo)'
                                          class='ion-star'
                                          style="font-size:25px"
                                          :style="{color:marker.busiInfo.isFavorite?'orange':'rgba(0,0,0,.3)'}" />
                                </div>
                                <div class="itme-div-conni"
                                     @click="goto">
                                    {{marker.busiInfo.binfoTitle}}...
                                </div>
                            </div>
                        </swiper-item>
                        <div class="button shadow ion-chevron-right"
                             @click='next'
                             style="right:5px;top:50px;text-align:center"
                             :style="$store.state.themestyle.theme.button">
                        </div>
                    </swiper>
                </transition>
            </div>
        </div>
        <nav class="mtabar"
             :style='theme.tabbar'>
            <div @click='goto'
                 tag='div'
                 class="detail">
                <p> {{ $t('tabbar.gengduo')}}</p>
            </div>
            <div @click='daohang'
                 class="navigation">
                <p>{{ $t('tabbar.map')}}</p>
            </div>
            <!--<router-link :to="{name:'help'}"
                         tag='div'
                         class="help ">
                <badge :text="$store.state.help.unread"
                       v-show="$store.state.help.unread"
                       class="shansuo"></badge>
                <p>{{ $t('tabbar.bangzhu')}}</p>
            </router-link>-->
            <div @click="missionDetail"
                         tag='div'
                         class="mission">
                <p>{{ $t('tabbar.renwu')}}</p>
            </div>
        </nav>
    </div>
</template>

<style lang="less">
.vux-popup-spwier-transiton {
    transition-property: transform;
    transition-duration: 300ms;
}

.vux-popup-spwier-enter {
    transform: translate3d(0, 100%, 0);
}

.vux-popup-spwier-leave-active {
    transform: translate3d(0, 100%, 0);
} // .swipershow {
//     transition-property: transform;
//     transition-duration: 300ms;
// }
.help {
    position: relative;
    .vux-badge {
        position: absolute;
        top: 0px; // right: 0px;
    }
}

#map {
    position: relative;
    .serachdiv {
        height: 45px;
        position: absolute;
        top: 25px;right:7%;
        transition:width 500ms;
        opacity: .7;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center; // padding:0 8px;
        .seachicon {
            width: 50px;
            text-align: center;
            font-size:40px;
            font-weight: 900
        }
        #serch {
            flex: 1;
            border: 0;
            outline: none;
            height: 35px;
            font-size: 18px;
            padding: 0;  
        }
    }

    .swpier {
        position: absolute;
        width: 100%;
        bottom: 5px;
        z-index: 199;
        height: 135px;
        .button {
            z-index: 99999;
            position: absolute;
            background: rgba(255, 255, 255, 0.75);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
            height: 23px;
            width: 23px;
            border-radius: 50%;
            padding: 5px;
        }
        .itme-div {
            width: 87%;
            height: 120px;
            margin-top: 5px;
            margin-left: 7%;
            background: #F2F1F0;
            border-radius: 9px;
            overflow: hidden;
            box-shadow: 0px 1px 7px 0px rgba(50, 50, 50, 0.3);
            .itme-div-title {
                background: #ffffff;
                display: flex;
                font-size: 20px;
                font-weight: bold;
                color: #02a1ab;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;
            }
            .itme-div-conni {
                padding: 5px 15px 15px ;
                line-height: 1.3;
                font-size: 17px;
                text-align: left;
                color: #666;
                height: 80%;
                overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                // display: -webkit-box;
                // -webkit-line-clamp: 3;
                // -webkit-box-orient: vertical;
                // word-break: break-all;
            }
        }
    }
    .location {
        height: 25px;
        width: 25px;
        background: rgba(255, 255, 255, 0.75);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
        position: absolute;
        z-index: 12;
        left: 25px;
        bottom: 50px;
        padding: 8px;
        text-align: center;
        line-height: 25px;
        border-radius: 50%; // border: 1px solid #ddd;
        &:active {
            color: black;
            opacity: 0.7
        }
    }
    .satrtmission {
        height: 25px;
        width: 25px;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
        position: absolute;
        z-index: 12;
        top: 120px;
        right: 25px;
        padding: 8px; // margin: auto;
        font-size: 18px;
        text-align: center;
        border-radius: 50%; // &:before{
        //     content:'';
        //     display:block;
        //     width:30px;
        //     height:30px;
        //     margin:auto;
        //     background:url(../../assets/image/icon-mtabar.png) no-repeat;
        //        background-position:50% -119px;
        //     background-size:100%;
        // }
        // animation:blinking 0.3s linear 1s infinite alternate;
        &:active {
            color: black;
            opacity: 0.7
        }
    }
}
</style>

<script>
import {
    mapState,
    mapMutations,
    mapActions
} from 'vuex'
import {
    userFavoriteBusInfo,
    userFavoriteCancel

} from 'api/api';
import {
    Swiper,
    SwiperItem,
    Badge
} from 'vux'
import GPS from '../../util/gps'

let map = null;
export default {
    name: 'home',
    data() {
        return {
            locationMarker: null,//定位marker对象
            searchValue: '',//搜索内容
            searchShow:false,//是否显示搜索框
            index: 0,
            swipershow: true,
            busiInfoMarkers: [],//商家地图标注maker对象集合
          
            cameraTarget: {
                lat: 0,
                lng: 0
            },
            // currentList: [],//当前视角商家
            ARbtn: false
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.swipershow) {
            this.swipershow = false
        }
        next()
    },
    components: {
        Swiper,
        SwiperItem,
        Badge
    },
    computed: {
        ...mapState({
            myPostion: state => state.map.myPostion,
            marker: state => state.map.marker,
            markerList:state => state.map.markerList,
            sideright: 'sideright',
            busiInfoList: state => state.busiInfo.busiInfoList,
            theme: state => state.themestyle.theme,
            missionList: state => state.mission.missionList,
            clickable: state => state.map.clickable,
            reminder: state => state.mission.reminder,
            activeMisson: state => state.mission.activeMisson,
            showdialog:state=>state.showdialog
        }),
        styles() {
            let out = 102
            if (this.$store.state.platformId === 'ios') {
                out += 20;
            }
            return {
                height: document.documentElement.clientHeight - out + 'px'
            }
        }
    },
    watch: {
        //观察快速入口菜单的显示隐藏，设置地图禁止点击
        sideright(flag) {
            if (map) map.setClickable(!flag)

        },
        showdialog(value){
            if(!map)return
            if(value){
                map.setClickable(false)
            }else{
                map.setClickable(true)
            }
        },
        reminder(reminder) {
            let distance = GPS.distance(this.myPostion, reminder)
            if (reminder.remindAct === 1 && distance <= reminder.distance) {
                this.ARbtn = true
            } else {
                this.ARbtn = false
            }
        },
        clickable(flag) {
            if (map) map.setClickable(flag)
        },
        //观察我的位置变动
        myPostion(postion) {
            if (this.locationMarker) {
                this.locationMarker.setPosition(postion)
            }

            this.missionList.forEach(mission => {
                if ((mission.status && mission.status != 2) || mission.status == null) {
                    setTimeout(() => {
                        this.gameRole(mission.gameTaskRemindList, postion, mission)
                    }, 0)
                }
            })

        },
        //观察当前显示的活动显示小窗口，移动地图视窗
        index(v) {
            if (map) {
                let obj = this.markerList[v].busiInfo
                this.setMarker(obj)
            }

        },
        //观察当前显示的marker，移动地图视窗和显示小窗口
        marker(m) {
          
            if (m && map) {
                map.animateCamera({
                    'target': {
                        lat:m.binfoLatitude,
                        lng:m.binfoLongitude
                    },
                    'tilt': 45,
                    'zoom': 16,
                    'bearing': 0,
                    duration: 1000
                });
                this.setIndex(m)
            }
        },
        //观察商家列表，清空旧的marker,创建新的marker
        busiInfoList(arr) {
            setTimeout(()=>{
                this.clearBusInfoMarkers()
            },0)
        },
    },
    created() {

    },
    mounted() {
        document.addEventListener("deviceready", () => {
            let div = document.getElementById("map");
            map = plugin.google.maps.Map.getMap(div);
            map.addEventListener(plugin.google.maps.event.MAP_READY, this.onMapReady);
            map.on(plugin.google.maps.event.CAMERA_CHANGE, this.regionalBusiness);
        }, false);
    },
    methods: {
        ...mapMutations([
            'setMarker',//当前显示的marker
            'setActiveMisson',
            'setReminder',
            'updatedClickable'
        ]),
        ...mapActions([
            'getBusiInfoList', //获取商家列表
        ]),
        //游戏规则
        gameRole(rmindList = [], myPostion, mission) {
            rmindList.forEach((remind, index) => {
                let distance = GPS.distance(myPostion, mission)
                if (index === 0) {
                    if (distance <= remind.distance && !remind.isOpen) {
                        remind.isOpen = true
                        remind.lat = mission.lat
                        remind.lng = mission.lng
                        remind.areaCode = mission.areaCode
                        this.setActiveMisson(mission)
                        this.setReminder(remind)
                    }
                } else {
                    if (distance <= remind.distance && distance > rmindList[index - 1].distance && !remind.isOpen) {
                        remind.isOpen = true
                        remind.lat = mission.lat
                        remind.lng = mission.lng
                        remind.areaCode = mission.areaCode
                        this.setActiveMisson(mission)
                        this.setReminder(remind)
                    }
                }
            })
        },
        //地图视角改变回调
        regionalBusiness(camera) {
            if (camera.zoom > 9  ) {
                this.getVisibleRegion()
            }
        },
        getVisibleRegion() {
            //获取地图东南，西北的经纬度
            map.getVisibleRegion(e => {
                let distance = GPS.distance(this.cameraTarget, e.southwest)
                if (distance > 3000 ) {
                    // this.getcurrentList(e)
                     this.getBusiInfoList({
                        southwest: e.southwest,
                        northeast: e.northeast,
                        userId: this.$store.state.user.userId
                    })
                    this.cameraTarget = e.southwest
                }
            })
        },
        //获取当前视角的商家
        // getcurrentList(e) {
        //     this.getBusiInfoList({
        //         southwest: e.southwest,
        //         northeast: e.northeast,
        //         userId: this.$store.state.user.userId
        //     }).then(arr => {
        //         this.currentList = arr || []
        //     })
        // },
        //跳转到商家详情页面
        goto() {
            this.$router.push({
                name: 'markerDetail',
                params: {
                    title: this.marker.binfoName
                }
            })
        },
        gohome() {
            this.$router.push({ name: 'bigMap' })
        },
        //搜索按钮点击事件
        onEnter(e) {
            if (!this.searchValue) {
                this.$vux.toast.show({
                    text: this.$t('map.verification'),
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })
            } else {
                document.getElementById('serch').blur()
                let binfoName = this.searchValue
                    this.$router.push({
                        path: '/areaList',
                        query: {
                            binfoName: binfoName,
                            title: this.$t('areaList.search',{addr:binfoName})
                        }
                    })
                    this.searchValue = ''
            }
        },
        //调用导航
        daohang() {
            plugin.google.maps.external.launchNavigation({
                "from": this.$store.state.map.myPostion.lat + "," + this.$store.state.map.myPostion.lng,
                "to": (this.marker.lat || this.marker.binfoLatitude) + "," + (this.marker.lng || this.marker.binfoLongitude)
            });
        },
        //定位位置
        location() {
            map.animateCamera({
                target: this.myPostion,
                zoom: 16,
                tilt: 45,
                bearing: 0,
                duration: 500
            });
        },
        //地图初始化完成回调
        onMapReady() {
            map.setCompassEnabled(false)
            map.setClickable(this.clickable)
            this.$store.commit('updateMap', map)

            
            let position = {
                lat: this.marker.binfoLatitude,
                lng: this.marker.binfoLongitude
            }
            map.animateCamera({
                'target': position,
                'tilt': 45,
                'zoom': 16,
                'bearing': 0,
                duration: 3000
            });

            //添加位置marker
            map.addMarker({
                'position': this.myPostion,
                'title': this.$t('map.locationTitle'),

            }, (marker) => {
                this.locationMarker = marker
               
            });
            this.setIndex(this.marker)
            map.addEventListener(plugin.google.maps.event.MAP_CLICK, (e) => {
                this.swipershow = false
                this.searchShow= false
                document.getElementById('serch').blur()
            });
        },
        //清除商家marker
        clearBusInfoMarkers() {
            this.busiInfoMarkers.forEach((marker, index) => {
                let flag = this.busiInfoList.some(obj => {
                    return obj.busiInfoId == marker.get('busiInfoId')
                })
                if (!flag) {
                   if(marker.get('typeCode')!= "viewspot"){
                        marker.remove()
                        this.busiInfoMarkers.splice(index, 1)
                   } 
                }
            })
            setTimeout(()=>{
                 this.setBusiInfoMarkers()
            },0)
        },
        //设置商家marker
        setBusiInfoMarkers() {    
            this.busiInfoList.forEach((obj) => {
               
                let flag = this.busiInfoMarkers.some(marker => {
                    if(obj.busiInfoId == marker.get('busiInfoId')){
                        marker.setTitle(obj.binfoName)
                    }
                    return obj.busiInfoId == marker.get('busiInfoId')
                })
                
                if (!flag) {
                    this.addBusiInfoMarkers(obj)
                }
            })
        },

        addBusiInfoMarkers(obj) {
          
            map.addMarker({
                position: {
                    lat: obj.binfoLatitude,
                    lng: obj.binfoLongitude
                },
                title: obj.binfoName,
                icon:{
                    'url': obj.typeCode == "viewspot" ? obj.binfoIcon : obj.typeIcon,
                    size: {
                        width: obj.typeCode == "viewspot" ? 75 : 35,
                        height: obj.typeCode == "viewspot" ? 80 : 55,
                    }
                }
            }, (marker) => {
               if(obj.typeCode == "viewspot")marker.setZIndex(999)
                marker.set('busiInfoId', obj.busiInfoId)
                marker.set('typeCode', obj.typeCode)
                this.busiInfoMarkers.push(marker)
                //marker点击事件
                marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, () => {
                     this.setIndex(obj)
                     this.setMarker(obj)
                });
                //markerinfo 点击事件
                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, () => {
                    this.goto()
                })
            })
        },
     
        setIndex(marker) {
               this.swipershow = this.markerList.some((obj,index)=>{
                   if(obj.busiInfo.busiInfoId==marker.busiInfoId){
                        setTimeout(()=>{
                           this.index=index
                       },0)
                   }
                    return obj.busiInfo.busiInfoId==marker.busiInfoId
                })
                
        },
        //上一个滑动窗口
        prv() {
            if (this.index === 0) {
                this.index = this.markerList.length - 1
            } else {
                this.index -= 1
            }
        },
        //下一个滑动窗口
        next() {
            if (this.index === this.markerList.length - 1) {
                this.index = 0
            } else {
                this.index += 1
            }
        },
        //收藏
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
        },
        satrtmission() {
            document.addEventListener("deviceready", (e) => {
                CameraPreview.stopCamera();
                CameraPreview.startCamera({
                    camera: "back",
                    tapPhoto: false,
                    previewDrag: false,
                    toBack: false,
                    isAr: true,
                    location: this.reminder.areaCode,
                    pauseTime: 3000,
                    lat: this.myPostion.lat,
                    lng: this.myPostion.lng
                 }, e => {
                    if (e === 'close') this.updatedClickable(true)
                }, e => {
                    this.updatedClickable(true)
                });
            })
        },
        missionDetail(){
            let obj = this.missionList.filter( mission=> {
                return this.marker.areaId===mission.areaId 
            })[0]||null;
             this.$store.commit('setActiveMisson',obj)
            this.$router.push({name:'acceptmission'})
        },
        searchClick(){
            this.searchShow=!this.searchShow
            if(this.searchShow)document.getElementById('serch').focus()
        }
    }

}
</script>