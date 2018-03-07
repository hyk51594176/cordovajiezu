<template>
      <div class="home acceptimission">
		    <div v-if="!missionObj"
             style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
           <div class="acceptimission-neirong" v-if="missionObj">
	           	 <h3>{{missionObj.gameName}}</h3>
	             <div class="colorBox shadow">
			    	<span class='ion-flag'> {{$t('mission.place')}}</span>: {{missionObj.areaName}}
			     </div>
           
            	<div class="acceptimission-summary" v-html='missionObj.gameDetail'>
	            
	            </div>
	       
	            
	            <div class="fullWhiteBox">
					<div >
						<h4>
							<span class='ion-trophy'></span>{{$t('mission.reward')}}
						</h4>
							<strong>{{missionObj.giftName}}</strong>
							{{missionObj.binfoName}}
					</div>
		            	<img :src="markerImg" @error="$event.target.src=errorImg"  >
	            </div>
	            
        
        </div>
        <x-button class="btn "
		v-if='missionObj&&missionObj.status===1'
		@click.native='scan'
                  :style='$store.state.themestyle.theme.button'>
                  {{$t('mission.start')}}
        </x-button>
    </div>
    </div>
</template>
<script>
    import {
        XButton,
        Divider
    } from 'vux'
    import {
        userTaskProcessFinish
    } from 'api/api'
    import errorImg from '../../assets/image/logo192.png'
    export default {
        data() {
            return {
                errorImg: errorImg
            }
        },
        components: {
            XButton,
            Divider
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
        methods: {
            scan() {
                cordova.plugins.barcodeScanner.scan(
                    result => {
                        if (result.text) {
                            userTaskProcessFinish({
                                gameId: this.missionObj.gameId,
                                userId: this.$store.state.user.userId,
                                qrCode: result.text
                            }).then(res => {
                                this.missionObj.status = 2;
                                this.missionObj.qrCode = res.data.obj;
                                this.$router.replace('/endmission')
                            })
                        }
                    },
                    error => {

                    }, {
                        preferFrontCamera: false, // iOS and Android
                        showFlipCameraButton: true, // iOS and Android
                        showTorchButton: true, // iOS and Android
                        torchOn: false, // Android, launch with the torch switched on (if available)
                        prompt: this.$t('barcodeText'), // Android
                        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                        formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                        orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                        disableAnimations: true, // iOS
                        disableSuccessBeep: false // iOS
                    });
            }
        }
    }
</script>
<style lang="less">
    .acceptimission {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .acceptimission-neirong {
            text-align: left;
            padding: 0;
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            h3 {
                margin-top: 5px
            }
            h3::before {
                content: '';
                width: 35px;
                height: 30px;
                display: block;
                float: left;
                margin-left: 20px;
                margin-right: 5px;
                background: url("../../assets/image/icon-mtabar.png") 0 -652px no-repeat;
                background-size: 100%;
            }
            .acceptimission-summary {
                padding: 5px 15px 10px 15px;
            }
            .fullWhiteBox {
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                h4 {
                    color: #cf4763;
                    font-size: 16px;
                }
                li {
                    margin-left: 32px;
                    line-height: 1.4
                }
                div {
                    font-size: 14px;
                    width: 70%;
                    border-right: 1px dashed #ccc;
                    height: 100%;
                    display: flex;
                    justify-content: space-around;
                    flex-direction: column;
                }
                img {
                    height: 100%;
                }
            }
            .reward {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
        .btn {
            width: 70%;
            margin: 10px auto;
        }
        .colorBox {
            margin: 0 auto 5px auto;
            span {
                padding-right: 5px;
                color: #02a1ab;
            }
        }
    }
</style>