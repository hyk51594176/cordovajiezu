<template>
    <div class="home changepass">
        <group>
            <x-input v-model="user.userPwd" type='password'@on-blur="change" :placeholder="$t('findpasspage.oldpass')" novalidate></x-input>
            <x-input v-model="user.newpassWd" type='password' @on-blur="change" :placeholder="$t('findpasspage.firstpass')" novalidate></x-input>
            <x-input v-model="userPwd" type='password' @on-blur="change" :placeholder="$t('findpasspage.secondpass')" novalidate></x-input>
        </group>
        <div style="padding:8px;color:red;font-size: 13px;" v-show='VeriMsg' class=' vux-1px-t'>
            *{{VeriMsg}}
        </div>
        <x-button class="changepass-btn" @click.native="updatePerson"   :style='$store.state.themestyle.theme.button'>{{$t('changeperson.btn')}}</x-button>
    </div>
</template>
<script>
import { XInput, XButton, Group } from 'vux'
import { userInfoChangePasswd } from 'api/api';
export default {
    data() {
        return {
            user: {
                userId: this.$store.state.user.userId,
                userPwd: '',
                newpassWd: ''

            },
            userPwd: '',
            VeriMsg:''
        }
    },
    components: {
        XInput, XButton, Group
    },
    methods: {
        updatePerson() {
            if (!this.checePwd(this.user.userPwd)) {
                this.$vux.toast.show({
                    text: this.$t('account.verification.userPwd'),
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })

            } else if (!this.checePwd(this.user.newpassWd)) {
                this.$vux.toast.show({
                    text: this.$t('account.verification.userPwd'),
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })

            } else if (this.user.newpassWd !== this.userPwd) {
                this.$vux.toast.show({
                    text: this.$t('account.verification.noyz'),
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })
            } else {
                userInfoChangePasswd(this.user).then(res => {
                    this.$router.back()
                })
            }
        },
        change(value){
            if(!this.checePwd(value)){
                this.VeriMsg = this.$t('account.verification.userPwd')
            }else{
                 this.VeriMsg =''
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
    }
}
</script>
<style lang="less">
.changepass-btn {
    margin-top: 150px;
    width: 88% !important;
}
</style>