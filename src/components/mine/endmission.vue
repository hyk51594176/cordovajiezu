<template>
    <div class="home endmission">
        <div class="endmission-neirong">
            <h4> {{missionObj.gameName}}  </h4>

            <div style="position:relative;">

                <img :src="markerImg" @error="$event.target.src=errorImg">
                <div class="mission-congratulate" :style="styles"></div>
            </div>
            <div class='endmission-ment'>
                {{$t('mission.endmission')}}
            </div>
            <div class="colorBox shadow">
                <span class='ion-flag'> {{$t('mission.place')}}</span>: {{missionObj.areaName}}
                <br>
                <span class='ion-trophy'> {{$t('mission.reward')}}</span>:{{missionObj.giftName}}
    
            </div>
            <div class="qrcode" v-if='missionObj.qrCode'>
                <barcode :text="missionObj.qrCode"   
                :option="{  width:2,
                            background:'transparent',
                            textAlign:'center'}"/> 
                <vueqrious :value='missionObj.qrCode' :size='150' />
                            
            </div>
        </div>
        <!--<x-button class="btn "
                      :style='$store.state.themestyle.theme.button'>
                      {{$t('camera.title')}}
            </x-button>-->
    </div>
</template>
<script>
import { XButton } from 'vux'
import vueqrious from '../../plugin/vue-qriously';
import barcode from '../../plugin/barcode';
import errorImg from '../../assets/image/logo192.png'
export default {
    components: {
        XButton,
        vueqrious,
        barcode
    },
    data() {
        return {
            errorImg: errorImg,
            styles:{
                background:`url(${require('../../assets/image/tag-congratulate-en.png')}) no-repeat`,
                'background-size':'100%'
            }
        }
    },
    computed: {
        missionObj() {
            return this.$store.state.mission.activeMisson
        },
        markerImg() {
            let obj = this.$store.state.map.markerList.filter(m => {
                return this.missionObj.areaId == m.areaId
            })[0] || {}
            return obj.centIcon
        }
    },
}
</script>
<style lang="less">
.endmission {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    h4 {
        margin-bottom: 20px;
    }
    .qrcode {
        display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        padding:10px 0;
    }
    .endmission-ment {
        margin-top: 30px;
        color: #666;
        font-size: 20px;
    }
    @keyframes tagAni {
        from {
            width: 400px;
            height: 350px;
            opacity: 0;
            margin-top: -250px;
            margin-left: -200px;
        }
        to {
            opacity: 1
        }
    }
    .mission-congratulate {
        position: absolute;
        
        animation-name: tagAni;
        animation-duration: 0.7s;
        animation-timing-function: ease-in;
    }
    .btn {
        width: 70%;
        margin: 10px auto;
    }
    .colorBox {
        span {
            padding-right: 5px;
            color: #02a1ab;
        }
    }
    .endmission-neirong {
        width: 100%;
        text-align: center;
        padding-top: 18px;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        canvas {
            display: block;
        }
        img {
            width: 150px;
        }
    }
}
</style>