<template>
    <div class="home perscenter ">
        <div class="vux-1px-tb perscenter-con">
            
            <cell  is-link
                  @click.native="changePerson('photoUrlFile')">
                <img :src="userInfo.avatar||''"
                     @error='$event.target.src=require("../../assets/image/logo192.png")'
                     slot="icon"
                      class="photoUrlFile">
            </cell>
            <cell :title="$t('personCenter.realName')"
                  :value="userInfo.realName"
                  is-link
                  @click.native="changePerson('realName')" />
            <cell :title="$t('personCenter.nikeName')"
                  :value="userInfo.nikeName"
                  is-link
                  @click.native="changePerson('nikeName')" />
                   <cell :title="$t('personCenter.userCountry')"
                  :value="userInfo.userCountry"
                  is-link
                  @click.native="changePerson('userCountry')"/> 
        
            <cell :title="$t('personCenter.gender')"
                  :value="userInfo.gender===0?$t('changeperson.unknown'):(userInfo.gender===1?$t('changeperson.boy'):$t('changeperson.girl'))"
                  is-link
                  @click.native="changePerson('gender')" /> 
                  <!--@click.native="changePerson('passportNo')"-->
            <cell :title="$t('personCenter.passportNo')"
                  :value="userInfo.passportNo"
                  is-link
                  />
                      <cell :title="$t('personCenter.userCode')"   is-link @click.native="changePerson('userCode')">
                    <vueqrious :value='userInfo.userCode' :size='35' :padding='8' v-if="userInfo.userCode"/> 
                  </cell>
          <cell :title="$t('personCenter.changePawd')"
                  is-link
                  @click.native="$router.push('/changePawd')"/> 
            <!--<cell :title="$t('personCenter.points')"
                  :value="userInfo.points" /></cell>-->
               
        </div>
    </div>
</template>
<script>
import { Cell } from 'vux'
 import vueqrious  from '../../plugin/vue-qriously';
  
import {
    userInfoDetail
} from 'api/api';
export default {
    data() {
        return {
            userInfo: {  }
        }
    },
    components: {
        Cell,
        vueqrious
    },
    created() {
        userInfoDetail({ userId: this.$store.state.user.userId }, false)
            .then(res => {
                this.userInfo = res.data.obj
            })
    },
    methods: {
        changePerson(type) {
            this.$router.push({
                name: 'changePerson',
                params: {
                    title: `personCenter.${type}`,
                    key: type,
                    value: this.userInfo[type]
                }
            })
        },
        showuserCode(){

        }

    }
}
</script>
<style lang="less">
.perscenter-con {
    background: #ffffff;
    margin-top: 8px;
    .photoUrlFile{
        display:block;
        width:45px;
        height:45px;
        border:2px solid #fff;
        border-radius:50%;
        box-shadow:0px 2px 2px 0px rgba(50, 50, 50, 0.2) 
    }
}
</style>