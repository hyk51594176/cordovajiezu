<template>
    <div class="privacy">
        <tab :line-width="1" custom-bar-width="60px">
            <tab-item :selected='index===1' @click.native='index=1'>{{$t('PrivacyAgreement.personProtocol.tab')}}</tab-item>
            <tab-item :selected='index===2' @click.native='index=2'>{{$t('PrivacyAgreement.serviceUseClause.tab')}}</tab-item>
            <tab-item :selected='index===3' @click.native='index=3'>{{$t('PrivacyAgreement.goodsReturn.tab')}}</tab-item>
            <tab-item :selected='index===4' @click.native='index=4'>{{$t('PrivacyAgreement.companyInformation.tab')}}</tab-item>
        </tab>
        <div class="conner" v-show='index===1' v-html="$t('PrivacyAgreement.personProtocol.conner')">
        </div>
        <div class="conner" v-show='index===2' v-html="$t('PrivacyAgreement.serviceUseClause.conner')">
        </div> <div class="conner" v-show='index===3' v-html="$t('PrivacyAgreement.goodsReturn.conner')">
        </div> <div class="conner" v-show='index===4' v-html="$t('PrivacyAgreement.companyInformation.conner')">
        </div>
        <div class="bottom vux-1px-t">
            <div class="mradio weui-cells_checkbox" >
                <label class="weui-cell weui-check__label"  >
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox1" v-model="isAgree"     ><!--value===index-->
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{$t('PrivacyAgreement.agree')}} </p>
                    </div>
                </label>
            </div>
            <div class="mbtn"  :style="$store.state.themestyle.theme.button" type="primary" @click="isAgree&&($router.replace('/signUp'))"> {{$t('PrivacyAgreement.next')}}   </div>
        </div>
    </div>
</template>
<script>
import {Tab, TabItem,XButton,Checklist} from 'vux'
    export default {
        components: {
            Tab, TabItem,XButton,Checklist
        },
        data () {
            return {
               index:1,
               isAgree:false
            }
        },
    }
</script>
<style lang="less">
    .privacy{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .vux-tab-item{
            white-space: nowrap;
            text-overflow:ellipsis;
            text-overflow: ellipsis;
            overflow:hidden;
        }
        .conner{
             overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            background: #ffffff;
            flex: 1;
            padding: 8px;
        }
        .vux-tab .vux-tab-item.vux-tab-selected {
            color: #02A1AB;
            border-bottom: 3px solid #02A1AB;
        }
        .vux-tab-bar-inner {
            background-color: #02A1AB;
        }
        .bottom{
            height: 50px;
            line-height: 50px;
            display: flex;
            background: #ffffff;
            align-items: center;
            
            justify-content: space-between;
            width: 100%;
            .mradio{
            //    padding:0 12px;
                height: 100%;
                .weui-cell{
                     padding: 0px 12px;
                }
            }
             .mbtn{
                    height: 50px;
                     padding:0 12px;
                    &:active{
                        opacity: 0.5
                    }
                }
           
        }
    }
</style>