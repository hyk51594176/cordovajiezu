<template>
 
    <div id="bigMap"  class="home" :style="styles">
        <div class="coner"  :style="connstyle">
            <strong class="bigmap-title" :style='{color:$store.state.themestyle.theme.themeColor}'>
                {{$t('bigMap.addrName')}}
            </strong>
            <div class="item1">
                <div :class='obj.status' v-for='obj in markerListA'>
                    <img :src="obj.imgsrc"  @click="goto({name:'map'},obj.busiInfo)"/>
                    <!--<div style="position: relative;" class="storeti">-->
                        <span class="stoneName">{{obj.stoneName}}</span>
                    <!--</div>-->
                </div>
            </div>
            <div  class="item2">
                <div :class='obj.status'  v-for='obj in markerListB'>
                    <img :src="obj.imgsrc"  @click="goto({name:'map'},obj.busiInfo)"/>
                    <!--<div style="position: relative" class="storeti">-->

                        <span class="stoneName">{{obj.stoneName}}</span>
                    <!--</div>-->
                </div>
            </div>
             <div class="item3">
                  <span class="ion-map" @click="goto({name:'map'})"  :style="{color:$store.state.themestyle.theme.themeColor}" style="font-size:30px"/>
                  &nbsp;
                  
                  &nbsp;
                  <span  class="ion-android-menu" @click="goto({path:'/areaList',query:{title:$t('areaList.title'),typeCode:'viewspot'}})"  :style="{color:$store.state.themestyle.theme.themeColor}"  style="font-size:30px"/>
                  <!--<icon name="map" class="icon" @click.native="goto({name:'map'})" scale="3.5" :color="$store.state.themestyle.theme.themeColor" />-->
                  <!--<icon name="list" class="icon" @click.native="goto({name:'areaList',params:{title:$t('areaList.title')}})" scale="3.5" :color="$store.state.themestyle.theme.themeColor" />-->
             </div>
             
        </div>
    </div>
</template>
<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    // import  imgList from 'api/mapAreaimgList';   
    export default {
        name: 'bigMap',
        data() {
            return {
                styles: {
                    background: `url(${require('../../assets/image/bg-bigmap.png')}) center top no-repeat  #cce5eb`,
                    'background-size': '100% 100%'
                },
                connstyle: {
                    width: this.$store.state.windowSize.height,
                    height: this.$store.state.windowSize.width
                }
            }
        },
        created() {

        },
        mounted() {
            document.addEventListener("deviceready", (e) => {
                navigator.splashscreen.hide();
            })
        },
        computed: {
            ...mapState({
                markerList: state => state.map.markerList,
                myPostion: state => state.map.myPostion,
                missionList: state => state.mission.missionList
            }),
            markerListA() {
                return this.markerList.filter((obj) => {
                    if (obj.areaCode.indexOf('A') > -1) {
                        this.getImg(obj)
                        return obj
                    }
                })
            },
            markerListB() {
                return this.markerList.filter((obj) => {
                    if (obj.areaCode.indexOf('B') > -1) {
                        this.getImg(obj)
                        return obj
                    }
                })
            }
        },
        methods: {
            ...mapMutations([
                'setMarker',
                'setActiveArea'
            ]),

            getImg(obj) {
                if (obj.busiInfo) obj.busiInfo.typeCode = 'viewspot'
                let index = obj.areaCode.replace(/[^0-9]+/g, '')
                if (index > 10) return
                let mission = this.missionList.filter(m => {
                    return m.areaId == obj.areaId
                })[0] || {}
                if (this.myPostion.lng > obj.pointX1 && this.myPostion.lat < obj.pointY1 && this.myPostion.lng < obj.pointX2 && this.myPostion.lat > obj.pointY2) {
                    let status = mission.status ? 'status' + (mission.status + 4) : 'status4'
                    this.setActiveArea(obj)
                    obj.status = status
                    obj.imgsrc = require(`src/assets/mapareaImg/bigmap-${status}-${obj.areaCode.toUpperCase()}.png`)
                } else {
                    let status = mission.status ? 'status' + (mission.status + 1) : 'status1'
                    obj.status = status

                    obj.imgsrc = require(`src/assets/mapareaImg/bigmap-${status}-${obj.areaCode.toUpperCase()}.png`)
                }
            },
            goto(router, marker = this.markerList[0].busiInfo) {
                this.setMarker(marker)
                this.$router.push(router)
            }
        }
    }
</script>
<style lang="less">
    #bigMap {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        .coner {
            transform: rotate(90deg);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            flex-shrink: 0;
            // height: 100%;
            .bigmap-title {
                font-size: 25px
            }
            .item1 {
                display: flex;
                align-items: flex-start;
                div {
                    width: 10%;
                    margin-bottom: -4px;
                    img {
                        width: 100%;
                        &:active {
                            opacity: 0.3
                        }
                    }
                }
            }
            .item2 {
                display: flex;
                align-items: flex-start;
                div {
                    width: 10%;
                    img {
                        width: 100%;
                        &:active {
                            opacity: 0.3
                        }
                    }
                }
            }
            .item3 {
                align-self: flex-end;
                position: absolute;
                bottom: 0px;
                right: 20px;
                .icon {
                    margin-right: 12px;
                    &:active {
                        opacity: 0.3
                    }
                }
            }
        }
    }
</style>