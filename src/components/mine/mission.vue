<template>
    <div class="home mypage-mission">
        <div v-if="missionList.length==0" style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
        <div class="point-container ">
            <div class=" vux-1px-b" v-for='obj in missionList'>
                <div :class="`mession-neirong status${obj.status||3}`">
                    <div class="thumb-img">
                        <img :src="require(`../../assets/mapareaImg/jejustory-thumb-${obj.areaCode}.png`)">
                    </div>
                    <div class="mission-info">
                        <strong>{{obj.gameName}}</strong>
                        <p>
                            {{obj.gameIntroduction}}
                        </p>
                    </div>
                    <div class="mission-etc">
                        <!--:class="obj.status?'inContentBtn':'disable'" -->
                        <x-button @click.native='goto(obj)' :style="$store.state.themestyle.theme.button">{{$t('mission.showdetail')}}</x-button>
                    </div>
                    <img :src="obj.status==1?jinxingzhong:endmission" class="biao-img" v-if='obj.status'>
                </div>
            </div>
        </div>
        <!--<x-button class="btn " :style='$store.state.themestyle.theme.button' >{{$t('camera.title')}}</x-button>-->
    </div>
</template>
<script>
import {
    mapActions
} from 'vuex'
import jinxingzhong from '../../assets/image/jinxingzhong-en.png'
import endmission from '../../assets/image/endmission-en.png'

import { XButton } from 'vux'
export default {
    data() {
        return {
            jinxingzhong,
            endmission,
        }
    },
    components: {
        XButton,
    },
    created() {
        if (this.missionList.length == 0) {
            this.areaGameTaskPages()
        }
    },
    computed: {
        missionList() {
            return this.$store.state.mission.missionList.sort((a,b)=>{
                return b.status-a.status
            })
        }
    },
    methods: {
        ...mapActions([
            'areaGameTaskPages'
        ]),
        goto(obj) {
            // if(!obj.status)return 
            this.$store.commit('setActiveMisson', obj)
            if (obj.status === 2) {
                this.$router.push({ name: 'endmission' })
            } else {
                this.$router.push({ name: 'acceptmission' })
            }
        }
    }
}
</script>
<style lang="less">
.mypage-mission {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .disable {
        border: 1px solid #eee !important;
        background-color: #eee !important;
        margin-top: 3px;
        color: #fff !important;
        font-size: 18px !important;
    } //  
    .btn {
        width: 70%;
        margin: 10px auto;
    }
    .point-container {
        flex: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
        .biao-img {
            position: absolute;
            margin-top: 30px;
            left: 0;
            z-index: 500;
            width: 80px;
        }
        .mession-neirong {
            display: flex;
            justify-content: space-between;
            opacity:.6;
            background: #efefef;
            padding: 8px 10px 8px 6px;
            align-items: center;
            line-height: 1.3;
            font-size: 14px;
            color:#333;
            .thumb-img {
                width: 65px;
                height: 75px;
                border-radius: 9px;
                overflow: hidden;
                margin-right: 10px;
                img {
                    width: 65px;
                    height: 100%;
                    margin-left: -1px;
                }
            }
            .mission-info {
                flex: 1;
                text-align: left;
                strong {
                    display: block;
                    font-size: 18px;
                }
                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
            .mission-etc {
                color: #666;
                text-align: right;
                font-size: 13px;
                span {
                    margin-right: 8px
                }
                button {
                    height: 32px;
                    line-height: 1.6
                }
            }
        }
        .mession-neirong.status1,.mession-neirong.status2{
        	opacity:1;
        	background-color:#fff;
        	strong{
        		color:#164c82
        	}
        	p{
        		color:#666
        	}
        }
        .mession-neirong button{
        	border-color:#000 !important;
        	background-color:#333 !important;
        	font-size:15px;
        }
        .mession-neirong.status1 button{
        	border-color:#12757c !important;
        	background-color:#02a1ab !important;
        }
        .mession-neirong.status2 button{
        	border-color:#bc4e55 !important;
        	background-color:#d75a73 !important;
        }
    }
}
</style>