<template>
  <div class="home">
		 
		<div class="appConcept-shot">
			<span class="disc">{{$t('loginpage.title')}}</span>
			<strong>{{$t('loginpage.road')}}</strong>{{$t('loginpage.addr')}}
		</div>
		
		<div class="form-layout">
			<group>
				<x-input v-model="account"  :placeholder="$t('loginpage.inputAccount')" novalidate ></x-input>
				<x-input v-model="user.userPwd" type='password' :placeholder="$t('loginpage.inputPassword')" novalidate ></x-input>
			</group>
			<x-button @click.native="login" :style='$store.state.themestyle.theme.button' >{{$t('loginpage.login')}}</x-button>
			<div class="alignCenter">
				<router-link to='/findpass'>{{$t('loginpage.findPassword')}}</router-link>
				<router-link  to='/PrivacyAgreement'  class="focuslink" :style="{color:$store.state.themestyle.theme.themeColor}">{{$t('loginpage.register')}}</router-link>
			</div>
		</div>
   
  </div>
</template>
<style lang='less'>
</style>

<script>
import { XInput, XButton, Group } from 'vux'
import {mapActions} from 'vuex';
export default {
	components: {
		XInput,
		XButton,
		Group
	},
	data() {
		return {
			user:{
				userPwd:'',
				userPhone:'',
				userEmail:'',
				deviceType:'',
				deviceCode:'',
				userLanguage:window.localStorage.getItem('lang'),

			},
			account:''
		}
	},
	created () { },
	mounted(){
		// this.$nextTick(callback)
		document.addEventListener("deviceready", (e) => {
			navigator.splashscreen.hide();
			window.plugins.jPushPlugin.getRegistrationID(deviceCode=> {
				this.user.deviceCode=deviceCode
			})	
		})
	},
	methods: {
		...mapActions([
			'userInfoLogin',
			'areaGameTaskPages'
		]),
	 	isEmail(){
			var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
			return reg.test(this.account);
		},
		login() {

			if (this.account=='') {
				this.$vux.toast.show({
					text: this.$t('loginpage.inputAccount'),
					position: 'bottom',
					type: 'text',
					width: 'auto'
				})
				return;
			}
			if (this.user.userPwd=='') {
				this.$vux.toast.show({
					text: this.$t('loginpage.inputPassword'),
					position: 'bottom',
					type: 'text',
					width: 'auto'
				})
				return;
			}
			// if (!this.checePwd()) {
			// 	this.$vux.toast.show({
			// 		text: this.$t('account.verification.userPwd'),
			// 		position: 'bottom',
			// 		type: 'text',
			// 		width: 'auto'
			// 	})
			// 	return;
			// }
			if(this.isEmail()){
				this.user.userEmail=this.account
			}else{
				this.user.userPhone=this.account
			}
			this.user.deviceType=this.$store.state.platformId
			this.userInfoLogin(this.user).then(res=>{
				//登录成功
				this.areaGameTaskPages()
				this.$router.replace({name:'bigMap'});
			}) 
		},
	},
}
</script>

