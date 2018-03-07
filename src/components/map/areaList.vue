<template>
    <div id='area'
         class="home arealist"
         @scroll="lazloadin">
        <div v-for='busiInfoObj in busiInfoList'
             class="area" @click="goto(busiInfoObj)">
            <div class="left-title">
                <div class="titleimg">
                    <img :src="busiInfoObj.binfoIcon"><!--insert site marker image-->
                </div>
                
                <div>   
                    <div class="favorite">
                        <strong>{{busiInfoObj.binfoName}}</strong>
                        <span @click.stop='collection(busiInfoObj)'
                            class='ion-star'
                            style="font-size:25px"
                            :style="{color:busiInfoObj.isFavorite?'orange':'rgba(0,0,0,.3)'}" />
                    </div>
                    <address>{{busiInfoObj.binfoAddr}}</address>
                </div>
                
            </div>
            <div class="sidenBtn">
                <span class="juli">{{busiInfoObj.distance}} km</span>
                
                    <x-button mini
                              class="inContentBtn"
                             :style='$store.state.themestyle.theme.button'
                              @click.native.stop='daohang({lat:busiInfoObj.binfoLatitude,lng:busiInfoObj.binfoLongitude})'>{{$t('tabbar.map')}}</x-button>
            </div>
    
        </div>
        

        <div style="width:100%;text-align:center;padding-top:18px"
             v-if='page.binfoName'>
            {{$t('datacount',{count:recordsTotal})}}
        </div>
        <div style="width:100%;text-align:center;padding-top:18px"
             v-if='!page.binfoName&&busiInfoList.length===0'>
            {{$t('nodata')}}
        </div>
    </div>
</template>
<script>
    import {
        mapMutations
    } from 'vuex'
    import {
        XButton
    } from 'vux'

    import {
        userFavoriteBusInfo,
        userFavoriteCancel,
        busiInfoPages
    } from 'api/api';
    export default {
        name: 'areaList',
        data() {
            return {
                busiInfoList: [],
                recordsTotal: 0,
                page: {
                    length: 10,
                    start: 0,
                    binfoLongitude: this.$store.state.map.myPostion.lng,
                    binfoLatitude: this.$store.state.map.myPostion.lat,
                    userId: this.$store.state.user.userId,
                    binfoName: this.$route.query.binfoName,
                    typeCode: this.$route.query.typeCode,
                }
            }
        },
        created() {
            this.init()
        },

        components: {
            XButton
        },
        methods: {
            ...mapMutations([
                'setMarker',
            ]),
            init() {

                busiInfoPages(this.page).then(res => {

                    this.busiInfoList = [...this.busiInfoList, ...res.data.obj.data]
                    this.recordsTotal = res.data.obj.recordsTotal;
                })
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
            },
            daohang(latLng) {
                plugin.google.maps.external.launchNavigation({
                    "from": this.$store.state.map.myPostion.lat + "," + this.$store.state.map.myPostion.lng,
                    "to": latLng.lat + "," + latLng.lng
                });
            },
            goto(marker) {
                this.setMarker(marker)
                this.$router.push({
                    name: 'map'
                })
            },
            
            lazloadin(e) {
                if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20) {
                    if (this.$store.state.isLoading) return
                    if (this.busiInfoList.length < this.recordsTotal) {
                        this.page.start = this.busiInfoList.length;
                        this.init()
                    }
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    .arealist {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch
    }
    
    .area {
        background: #ffffff;
        border-bottom: 1px solid #ddd;
        padding: 3px 5px 6px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-title {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            .titleimg {
                width: 70px;
                flex-shrink: 0;
                margin-right: 3px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 100%;
                }
            }
            .favorite {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        address {
            line-height: 1.3;
            font-size: 13px;
        }
        strong {
            font-size: 20px;
            color: #164c82
        }
        .sidenBtn {
            width: 25%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            .inContentBtn {
                margin: 0;
                padding: 0 0.7em;
            }
        }
        .juli {
            font-size: 13px;
            color: #02a1ab
        }
    }
</style>