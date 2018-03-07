<template>
	<div class="singup" style="background: #fbf9fe">
	 
		<div class="appConcept-shot">
			<span class="disc">{{$t('loginpage.title')}}</span>
			<strong>{{$t('loginpage.road')}}</strong>{{$t('loginpage.addr')}}
		</div>
		<group gutter='8px' style="width:100%">
			 
			<div  v-show="step==1">	

				<div style="display: flex" v-show='user.accountType==="phone"'>		
					<select  v-model="user.areaCode"  style="width:60px;line-height: 47px;" class="weui-select">
						<option :value="str" v-for="str in areaCodeList">{{str}}</option>
					</select>
					<x-input  :placeholder="$t('findpasspage.account')" v-model="user.userPhone" novalidate /> 
				</div>
				<x-input :placeholder="$t('findpasspage.userEmail')" v-model.trim="user.userEmail" v-show='user.accountType==="email"' />
				
			<div class="flex vux-1px-t" >
				<x-input  v-model="authcode" :placeholder="$t('findpasspage.authcode')" novalidate /> 
				<x-button  @click.native="getauthcode" :disabled='plain' :show-loading='plain' :style='$store.state.themestyle.theme.button' class="inContentBtn"> {{btnText}}</x-button>
			</div>
			</div>
		<div v-show="step==2" >
				<x-input v-model="user.userPwd" :placeholder="$t('findpasspage.firstpass')" type='password' @on-blur="change($event,1)" novalidate />
				<x-input v-model="userPwd" type='password' :placeholder="$t('findpasspage.secondpass')" @on-blur="change($event,2)" novalidate />
		</div>
		</group>
			<div   class="accountType" v-show="step==1">	
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
		<div style="padding:8px;color:red;font-size: 13px;" v-show='VeriMsg' class=' vux-1px-t'>
			*{{VeriMsg}}
		</div>
		<x-button @click.native="creat()" style="width: 90%;margin-top:20px" :style='$store.state.themestyle.theme.button'> {{this.step == 2?$t('findpasspage.submit'):$t('findpasspage.next')}}</x-button>
	
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
		line-height: 40px;
		margin: auto
	}
}
.accountType{
	width: 100%;
	display:flex;
}
.weui-select {
    -webkit-appearance: none;
    border: 0;
    outline: 0;
    background-color: transparent;
    width: 100%;
    font-size: inherit;
    height: 44px;
    line-height: 44px;
    position: relative;
    z-index: 1;
    padding-left: 15px;
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
import { XInput, XButton, Group } from 'vux'
import { userInfoFogetPasswd, userInfoGetsmsCode,sysDictionariesGetByType,userInfoGetVcode } from 'api/api';
export default {
	components: {
		XInput,
		XButton,
		Group
	},
	data() {
		return {
			step: 1,
			user: {
				userPhone: '',
				userEmail: '',
				userPwd: '',
				opType: 2,
				areaCode:'+82',
				accountType:'phone',
			},
			userPwd: '',
			authcode: '',
			plain: false,
			serverCode: '',
			VeriMsg: '',
			areaCodeList:[],
			btnText: this.$t('findpasspage.getauthcode')
		}
	},
	created(){
		sysDictionariesGetByType({ dictType: 'areaCode' }).then(res => {
				let arr = res.data.obj || []
				this.areaCodeList = arr.map(obj => {
					return obj.dictCode
				})
			})
	},
	methods: {
		creat() {
			if (this.step === 1) {
				if(this.user.accountType==='phone'&&this.user.userPhone==''){
						this.$vux.toast.show({
							text: this.$t('account.verification.userPhone'),
							position: 'bottom',
							type: 'text',
							width: 'auto'
						})
				}else if(this.user.accountType==='email'&&this.user.userEmail==''){
						this.$vux.toast.show({
							text: this.$t('findpasspage.userEmail'),
							position: 'bottom',
							type: 'text',
							width: 'auto'
						})
				}else if (this.authcode == '') {
					this.$vux.toast.show({
						text: this.$t('account.verification.authcode'),
						position: 'bottom',
						type: 'text',
						width: 'auto'
					})
				} else if (this.authcode != this.serverCode) {
					this.$vux.toast.show({
						text: this.$t('account.verification.errorAuthcode'),
						position: 'bottom',
						type: 'text',
						width: 'auto'
					})
				} else {

					this.step = 2
				}
			} else {
				//密码请求修改成功
				if (this.finish()) {
					userInfoFogetPasswd(this.user).then(res => {
						this.$router.back()
					})
				}

			}
		},
		change(value,type) {
		 
			if(!value){
				this.VeriMsg =type===1? this.$t('account.verification.empty1'):this.$t('account.verification.empty2')
			}else if (!this.checePwd(value)) {
				this.VeriMsg = this.$t('account.verification.userPwd')
			}else if (type===2&&this.userPwd !== this.user.userPwd) {
				this.VeriMsg = this.$t('account.verification.noyz')
			 }else {
				this.VeriMsg = ''
			}
		},
		checePwd(userPwd) {
			let num = 0;
			let rule1 = /\d+/;
			let rule2 = /[a-z]+/;
			let rule3 = /[A-Z]+/;
			let rule4 = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
			let rule5 = /^.{6,16}$/;
			let flag1 = rule1.test(userPwd);
			let flag2 = rule2.test(userPwd);
			let flag3 = rule3.test(userPwd);
			let flag4 = rule4.test(userPwd);
			let flag5 = rule5.test(userPwd);
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
			if(this.VeriMsg){
				return false
			}else if(!this.user.userPwd){
				this.VeriMsg = this.$t('account.verification.empty1')
				return false
			}else if(!this.userPwd){
				this.VeriMsg = this.$t('account.verification.empty2')
				return false
			}else  {
				 return true
			}
		},

		verifyphone() {

			//验证手机号是否被占用
			if (isNaN(this.user.userPhone) || !this.user.userPhone) {
				this.$vux.toast.show({
					text: this.$t('account.verification.userPhone'),
					position: 'bottom',
					type: 'text',
					width: 'auto'
				})
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
					this.$vux.toast.show({
						text: this.$t('account.verification.userEmail'),
						position: 'bottom',
						type: 'text',
						width: 'auto'
					})
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
				this.btnText = (count--) + this.$t('findpasspage.btnText')
				if (count == 0) {
					clearInterval(ss);
					this.plain = false;
					this.btnText = this.$t('findpasspage.getauthcode')
				}
			}, 1000)
		}

	},
}
</script>