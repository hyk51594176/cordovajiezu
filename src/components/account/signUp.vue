<template>
	<div class="singup" style="background: #fbf9fe">
		<!--<img src="../svg/help.svg" style="width: 100%;" />-->
		<!--<x-img :src="src" :webp-src="`${src}?type=webp`" 
					@on-success="success"  @on-error="error" class="ximg-demo" error-class="ximg-error" 
					:offset="-100" container="#vux_view_box_body"></x-img>-->
		<group gutter='8px' style="width:100%">
			<!--<x-input v-show="step==1" :placeholder="$t('findpasspage.passportnumber')" novalidate></x-input>-->
			<div v-show="step==1">
				<div style="display: flex" v-show='user.accountType==="phone"'>		
					<select  v-model="user.areaCode"  style="width:60px;line-height: 47px;" class="weui-select">
						<option :value="str" v-for="str in areaCodeList">{{str}}</option>
					</select>
					
					<x-input :placeholder="$t('findpasspage.account')" v-model.trim="user.userPhone" />
				</div>
					<x-input :placeholder="$t('findpasspage.userEmail')" v-model.trim="user.userEmail" v-show='user.accountType==="email"' />
				<div class="flex vux-1px-t">
					<x-input v-model.trim="authcode" :placeholder="$t('findpasspage.authcode')" />
					<x-button @click.native="getauthcode" class="inContentBtn" :disabled='plain' :show-loading='plain' :style='$store.state.themestyle.theme.button'> {{btnText}}</x-button>
				</div>
			</div>
			<div v-show="step==2">
				<x-input :placeholder="$t('personCenter.nikeName')" v-model.trim="user.nikeName" @on-blur="verification('nikeName')" />
				<div style="padding:8px;color:red;align-self:flex-start" v-show='VeriMsg.nikeName' class='veriMsg vux-1px-t'>
					*{{VeriMsg.nikeName}}
				</div>
				<x-input v-model.trim="user.userPwd" type='password' :min='6' :max='16' :placeholder="$t('findpasspage.firstpass')" @on-blur="verification('userPwd')" />
				<div style="padding:8px;color:red;align-self:flex-start" v-show='VeriMsg.userPwd' class='veriMsg  vux-1px-t'>
					*{{VeriMsg.userPwd}}
				</div>
				<x-input v-model.trim="password" type='password' :min='6' :max='16' :placeholder="$t('findpasspage.secondpass')" @on-blur="verification('password')" />
				<div style="padding:8px;color:red;align-self:flex-start" v-show='VeriMsg.password' class='veriMsg  vux-1px-t'>
					*{{VeriMsg.password}}
				</div>
	
				<x-input :placeholder="$t('personCenter.realName')" v-model.trim="user.realName" @on-blur="verification('realName')" />
				<div style="padding:8px;color:red;align-self:flex-start" v-show='VeriMsg.realName' class='veriMsg  vux-1px-t'>
					*{{VeriMsg.realName}}
				</div>
				<selector :title="$t('personCenter.gender')" v-model="user.gender" :options="radios" @on-change="verification('gender')" ></selector>
	<div style="padding:8px;color:red;align-self:flex-start" v-show='VeriMsg.gender' class='veriMsg  vux-1px-t'>
					*{{VeriMsg.gender}}
				</div>
				<selector :title="$t('personCenter.userCountry')" v-model="user.userCountry" @on-change="verification('userCountry')" :options="countryList"></selector>
				<div style="padding:8px;color:red;align-self:flex-start" v-show='VeriMsg.userCountry' class='veriMsg  vux-1px-t'>
					*{{VeriMsg.userCountry}}
				</div>
				<x-input v-show="user.userCountry.toLocaleUpperCase()!='KR'" :placeholder="$t('findpasspage.passportnumber')" v-model.trim="user.passportNo" @on-blur="verification('passportNo')" />
	<div style="padding:8px;color:red;align-self:flex-start" v-show="VeriMsg.passportNo&&user.userCountry.toLocaleUpperCase()!='KR'" class='veriMsg  vux-1px-t'>
					*{{VeriMsg.passportNo}}
				</div>
			</div>
		</group>
	<div v-show="step==1" class="accountType">	
			<div class="mradio weui-cells_checkbox" >
					<label class="weui-cell weui-check__label"  >
						<div class="weui-cell__hd">
							<input type="radio" class="weui-check" name="checkbox1" v-model="user.accountType"   value='phone'   >
							<i class="weui-icon-checked"></i>
						</div>
						<div class="weui-cell__bd">
							

							<p>{{$t('personCenter.accountType1')}} </p>
						</div>
					</label>
				</div>
			<div class="mradio weui-cells_checkbox" >
                <label class="weui-cell weui-check__label"  >
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="checkbox1" v-model="user.accountType"  value='email' >
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{$t('personCenter.accountType2')}} </p>
                    </div>
                </label>
            </div>
	</div>
		<!--<div style="padding:8px;color:red;align-self:flex-start" v-show='value'  v-for="(value,key) in VeriMsg">
				*{{value}}
			</div>-->
		<x-button @click.native="creat()" style="width: 90%;margin-top:20px" :style='$store.state.themestyle.theme.button'> {{this.step == 2?$t('findpasspage.submit'):$t('findpasspage.creataccount')}}</x-button>
	
	</div>
</template>
<style lang="less">
.singup {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
		.inContentBtn {
		height: 40px !important;
		max-width:50%!important;
		line-height: 40px;
		margin: auto
	}
}
.accountType{
	width: 100%;
	display:flex;
}
.veriMsg{
	font-size: 13px;
}
.flex {
	display: flex; // margin-bottom: 8px ;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	.weui-btn {
		font-size: 13px;
		height: 35px;
		max-width: 150px;
		padding-left: 10px;
		padding-right: 10px;
		margin-right: 20px;
	}
}
</style>
<script>
import { XInput, XButton, Group, Radio, Selector,Checklist } from 'vux'
import { userInfoRegist, userInfoGetsmsCode, sysDictionariesGetByType,userInfoGetVcode } from 'api/api';
export default {
	components: {
		XInput,
		XButton,
		Group,
		Radio,
		Selector,
		Checklist
	},

	data() {
		return {
			step: 1,
			user: {
				userPhone: '',
				userEmail: '',
				userPwd: '',
				gender: '',
				nikeName: '',
				realName: '',
				userCountry: '',
				passportNo: '',
				opType: 1,
				areaCode:"+82",
				accountType:'phone',
			},
			VeriMsg: {
				userPwd: '',
				nikeName: '',
				realName: '',
				passportNo: '',
				password: '',
				gender:'',
				userCountry:'',
				passportNo:'',
			},
			password: '',
			authcode: '',
			plain: false,
			serverCode: '',
			btnText: this.$t('findpasspage.getauthcode'),
			countryList: [],
			areaCodeList:[],
			radios: [
				{
					value: this.$t('changeperson.boy'),
					key: 1
				},
				{
					value: this.$t('changeperson.girl'),
					key: 2
				}
			],
		}
	},
	created() {
		sysDictionariesGetByType({ dictType: 'countryCode' }).then(res => {
			let arr = res.data.obj || []
			this.countryList = arr.map(obj => {
				return {
					key: obj.dictCode,
					value: obj.name
				}
			})
		})
		sysDictionariesGetByType({ dictType: 'areaCode' }).then(res => {
			let arr = res.data.obj || []
			this.areaCodeList = arr.map(obj => {
				return obj.dictCode
			})
		})

	},
	methods: {
		verification(key) {
			if (key === 'userPwd' && !this.checePwd()) {
				this.VeriMsg[key] = this.$t('account.verification.userPwd')
			} else if (key === 'password') {
				if (!this.checePwd()) {
					this.VeriMsg[key] = this.$t('account.verification.userPwd')
				} else if (this.password !== this.user.userPwd) {
					this.VeriMsg[key] = this.$t('account.verification.noyz')
				} else {
					this.VeriMsg[key] = ''
				}
			} else if (this.user[key] == '') {
				this.VeriMsg[key] = this.$t(`account.verification.${key}`)

			} else {
				this.VeriMsg[key] = ''
			}

		},
		creat() {
			if (this.step === 1) {
				if(this.user.accountType==="phone"&&this.user.userPhone===""){
					this.showText(this.$t('account.verification.userPhone'));
				}else if(this.user.accountType==="email"&&this.user.userEmail===""){
					this.showText(this.$t('findpasspage.userEmail'));
				}else if (this.authcode == '') {
					this.showText(this.$t('account.verification.authcode'));
				} else if (this.authcode != this.serverCode) {
					this.showText(this.$t('account.verification.errorAuthcode'));
				} else {
					this.step = 2
				}
			} else {
				if (this.finish()) {
					userInfoRegist(this.user).then(res => {
						this.$router.back()
					})
				}
			}
		},
		checePwd() {
			let num = 0;
			let rule1 = /\d+/;
			let rule2 = /[a-z]+/;
			let rule3 = /[A-Z]+/;
			let rule4 = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
			let rule5 = /^.{6,16}$/;
			let flag1 = rule1.test(this.user.userPwd);
			let flag2 = rule2.test(this.user.userPwd);
			let flag3 = rule3.test(this.user.userPwd);
			let flag4 = rule4.test(this.user.userPwd);
			let flag5 = rule5.test(this.user.userPwd);
			if (flag1) {
				num = num + 1;
			}
			if (flag2) {
				num = num + 1;
			}
			if (flag3) {
				num = num + 1;
			}
			if (flag4) {
				num = num + 1;
			}
			if (!(num > 1 && flag5)) {
				return false;
			} else {
				return true
			}
		},
		finish() {
			if (!this.user.nikeName) {
				// this.showText(this.$t('account.verification.nikeName'));
				this.verification('nikeName')
				return false;
			}
			if (!this.checePwd()) {
				// this.showText(this.$t('account.verification.userPwd'));
				this.verification('userPwd')
				return false;
			}

			if (this.password !== this.user.userPwd) {
				// this.showText(this.$t('account.verification.noyz'));
				this.verification('password')
				return false;
			}
			
			if (!this.user.realName) {
				this.verification('realName')
				// this.showText(this.$t('account.verification.realName'));
				return false;
			}
			if (!this.user.gender) {
				this.verification('gender')
				// this.showText(this.$t('account.verification.gender'));
				return false;
			}
			if (!this.user.userCountry) {
				this.verification('userCountry')
				// this.showText(this.$t('account.verification.userCountry'));
				return false;
			}
			if (this.user.userCountry.toLocaleUpperCase() != "KR" && !this.user.passportNo) {
				this.verification('passportNo')
				// this.showText(this.$t('account.verification.passportNo'));
				return false;
			} 
			return true;
		},
		showText(text) {
			this.$vux.toast.show({
				text: text,
				position: 'bottom',
				type: 'text',
				width: 'auto',
				time: 4000
			})
		},
		verifyphone() {
			//验证手机号是否被占用
			if (isNaN(this.user.userPhone) || !this.user.userPhone) {
				this.showText(this.$t('account.verification.userPhone'));
				return false;
			}
			return true
		},
		isEmail(){
			var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
			return reg.test(this.user.userEmail);
		},
		//获取验证码
		getauthcode() {
			if(this.user.accountType==='phone'){
				if (!this.verifyphone()) return;
				userInfoGetsmsCode(this.user).then(res => {
					this.serverCode = res.data.obj
					this.timer()
				})
			}else{
				if (!this.isEmail()){
					this.showText(this.$t('account.verification.userEmail'));
					return;
				} 
				userInfoGetVcode(this.user).then(res=>{
					this.serverCode = res.data.obj
					this.timer()
				})
			}
			
		},
		timer() {
			const self = this;
			let count = 60;
			this.plain = true;
			let ss = setInterval(() => {
				self.btnText = (count--) + this.$t('findpasspage.btnText')
				if (count == 0) {
					clearInterval(ss);
					self.plain = false;
					self.btnText = this.$t('findpasspage.getauthcode')
				}
			}, 1000)
		}

	},
}
</script>