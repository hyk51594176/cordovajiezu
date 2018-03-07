<template>
    <div class="home mypoint">
        <div class="mypoint-tab" style="height:44px">
            <tab :line-width="1" custom-bar-width="60px">
                <tab-item :selected='index===1' @click.native='index=1'>{{$t('order.Unpaid')}}</tab-item>
                <tab-item :selected='index===2' @click.native='index=2'>{{$t('order.Paid')}}</tab-item>
                <tab-item :selected='index===3' @click.native='index=3'>{{$t('order.refable')}}</tab-item>
            </tab>
        </div>
        <div v-if="orderfilerList.length==0" style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
        <div class="mypoint-container">
    
            <div class="vux-form-preview weui-form-preview" v-for='(obj,index) in orderfilerList' :style="{'margin-top':index!=0?'8px':0}">
    
                <div class="weui-form-preview__hd">
                    <label class="weui-form-preview__label">{{$t("purchase.total")}}</label>
                    <em class="weui-form-preview__value">{{obj.currencyUnit}} {{obj.totalPrice}}</em>
                    <label class="weui-form-preview__label">{{$t("order.createTime")}}</label>
                    <em class="weui-form-preview__value" style="font-size:14px">
                                    {{obj.createTime}} 
                                </em>
                </div>
    
                <div class="weui-form-preview__bd">
                    <div v-for="item in obj.itemList">
    
                        <div class="weui-form-preview__item">
    
                            <label class="weui-form-preview__label">{{$t("order.itemIcon")}}</label>
                            <span class="weui-form-preview__value"><img :src="item.busiItem.itemIcon" style="height:50px"></span>
                        </div>
                        <div class="weui-form-preview__item" v-show="obj.status===2">
                            <label class="weui-form-preview__label">{{$t("order.code")}}</label>
                            <span class="weui-form-preview__value" @click='changeSize(obj.orderId.toString())'>
                                   <vueqrious :value='obj.orderId.toString()' :size='35'   /> 
                                </span>
                        </div>
                        <div class="weui-form-preview__item">
                            <label class="weui-form-preview__label">{{$t("order.itemName")}}</label>
                            <span class="weui-form-preview__value">{{item.busiItem.itemName}}</span>
                        </div>
                        <div class="weui-form-preview__item">
                            <label class="weui-form-preview__label"> {{$t("order.itemTitle")}} </label>
                            <span class="weui-form-preview__value"> {{item.busiItem.itemTitle}} </span>
                        </div>
                        <div class="weui-form-preview__item">
                            <label class="weui-form-preview__label">{{$t("order.itemPrice")}}</label>
                            <span class="weui-form-preview__value">
                                    {{item.busiItem.currencyUnitText}} {{item.busiItem.itemPrice}} 
                                </span>
                        </div>
                        <div class="weui-form-preview__item">
                            <label class="weui-form-preview__label">{{$t("order.count")}}</label>
                            <span class="weui-form-preview__value">
                                    {{item.count}} 
                                </span>
                        </div>
                        <div class="weui-form-preview__item" v-if="obj.status===2&&obj.shopType=='viewspot'">
                            <label class="weui-form-preview__label">{{$t("order.ticketNum")}}</label>
                            <span class="weui-form-preview__value">
                                {{item.ticketNum}} 
                            </span>
                        </div>
                        <div class="weui-form-preview__ft">
                            <a @click='refundable(item)' v-show="obj.status===2&&obj.shopType=='viewspot'&&item.ticketNum>0" class="weui-form-preview__btn weui-form-preview__btn_primary">{{$t("order.refundable")}}</a>
                        </div>
                    </div>
    
                </div>
                <div class="weui-form-preview__ft">
                    <a @click='delOrder(obj)' class="weui-form-preview__btn weui-form-preview__btn_info">{{$t("order.delete")}}</a>
                    <a @click='(order=obj)&&(showdialog=true)&&(dialogType="pay")' v-show="obj.status===1" class="weui-form-preview__btn weui-form-preview__btn_primary">{{$t("order.pay")}}</a>
    
                </div>
            </div>
    
        </div>
    
        <x-dialog v-model="showdialog" :scroll="false" hide-on-blur>
            <div v-if="dialogType=='code'" class="qrcode">
    
                <barcode :text="value"  :option="{  width:2,
                                background:'transparent',
                                textAlign:'center'}" />
                <vueqrious :value='value'   :size='200' />
            </div>
    
            <div class="seletheme" v-else-if="dialogType=='pay'">
                <img src="../../assets/image/apay.png" @click="payment('apay')">
                <img src="../../assets/image/wepay.png" @click="payment('wpay')">
            </div>
            <div v-else>
                <select class="shuliang" v-model="returnCount">
                    <option :value="0">{{$t('returnNum')}}</option>
                    <option :value="n" v-for="n in orderReturn.ticketNum">{{n}}</option>
    
                </select>
                <div class="weui-form-preview__ft">
                    <a @click='showdialog=false' class="weui-form-preview__btn weui-form-preview__btn_info">{{$t("order.cancel")}}</a>
                    <a @click='returnAdd' class="weui-form-preview__btn weui-form-preview__btn_primary">{{$t("order.sure")}}</a>
                </div>
            </div>
        </x-dialog>
    </div>
</template>
<script>
import { Tab, TabItem, FormPreview, XDialog, XButton } from 'vux'
import {
    userOrderPage,
    userOrderDelete,
    userOrderReturnAdd,
    payGetsina
} from 'api/api';
import barcode from '../../plugin/barcode';
import vueqrious from '../../plugin/vue-qriously';
export default {
    data() {
        return {
            index: 1,
            orderList: [],
            value: '',
            showdialog: false,
            dialogType: '',
            showdReturn: false,
            order: '',
            returnCount: 0,
            orderReturn: {}
        }
    },
    created() {
        this.init()
    },
    computed: {
        orderfilerList() {
            return this.orderList.filter(obj => {
                return obj.status === this.index
            })
        },
    },
    components: {
        Tab,
        TabItem,
        FormPreview,
        vueqrious,
        XDialog,
        barcode

    },
    methods: {
        init() {
            userOrderPage({ userId: this.$store.state.user.userId }).then(res => {
                this.orderList = res.data.obj
            })
        },
        refundable(obj) {
            this.returnCount = obj.ticketNum
            this.orderReturn = obj
            this.dialogType = 'ordeRe'
            this.showdialog = true
        },
        returnAdd() {
            if (this.returnCount === 0) return
            userOrderReturnAdd({
                busiInfoId: this.orderReturn.busiInfoId,
                returnCount: this.returnCount,
                busiItemId: this.orderReturn.busiItemId,
                userId: this.$store.state.user.userId
            }).then(res => {
                this.init()
                this.showdialog = false
            })
        },
        changeSize(code) {
            this.dialogType = 'code'
            this.value = code
            this.showdialog = true
        },
        delOrder(obj) {
            userOrderDelete({ orderId: obj.orderId }).then(res => {
                let index = this.orderList.indexOf(obj)
                this.orderList.splice(index, 1)
            })
        },
        payment(type) {
            if (type === 'wpay') {
                this.$vux.toast.show({
                    text: this.$t('nowepay'),
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })
                return
            }
            this.showdialog = false
            payGetsina({ orderId: this.order.orderId }).then(res => {
                if (type == 'apay') {
                    this.apay(res.data.obj)
                }
            })
        },
        apay(sign) {
            cordova.plugins.alipay.payment(sign, e => {
                console.log(e)
            }, e => {
                if (e.resultStatus == "4000") {
                    this.$vux.toast.show({
                        text: e.memo,
                        position: 'bottom',
                        type: 'text',
                        width: 'auto'
                    })
                } else if (e.resultStatus == "9000") {
                    this.order.status = 2;
                }
            });
        },
    }
}
</script>
<style lang="less">
.mypoint {
    display: flex;
    flex-direction: column;
    .qrcode{
          display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        padding:10px 0;
    }
    .mypoint-tab {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    }

    .weui-form-preview__btn_info {
        color: #FF9900
    }
    .myPoint-title {
        background-color: #f2f2f2;
        display: flex;
        width: 100%;
        padding: 10px 0;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        h3::before {
            content: '';
            display: block;
            float: left;
            margin-right: 7px;
            background: url('../../assets/image/icon-mtabar.png') 50% -652px no-repeat #fff;
            background-size: 85%;
            width: 45px;
            height: 45px;
            border-radius: 25px;
        }
        h3 {
            color: #335273;
            font-size: 30px;
        }
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: #02A1AB;
        font-weight: bold;
        border-bottom: 3px solid #02A1AB;
    }
    .vux-tab-bar-inner {
        background-color: #02A1AB;
    }
    .mypoint-container {
        overflow-y: auto;
        margin-top: 5px; // padding: 8px;
        -webkit-overflow-scrolling: touch;
    }
    .seletheme {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
        padding: 12px 0;
        img {
            // height: 60px;
            width: 100px;
            &:active {
                opacity: 0.5
            } //    border: 1px solid #ddd
        }
    }
    .shuliang {
        width: 100%;
        background: transparent;
        border: 0;
        font-size: 18px;
        padding: 20px
    }
}
</style>