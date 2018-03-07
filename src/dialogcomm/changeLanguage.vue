<template>
    <group :title="$t('gengduo.lang')" class='lang'>
        <radio :options="radio"
        v-model="value"
               @on-change="change"></radio>
    </group>
</template>
<script>
import { Group, Radio } from 'vux'
import {userInfoUpdate,busiInfoDetail} from 'api/api';
import {
    USERINFO_USERLOGIN
} from 'types';
import {
  mapActions
} from 'vuex'
export default {
    components: {
        Group, Radio
    },
    data () {
        return {
            value:window.localStorage.getItem('lang')||''
        }
    },
    computed: {
        
        radio() {
            let arr = []
            for (let key in this.language) {
                arr.push({
                    key: key,
                    value: this.language[key].languageName
                })
            }
            return arr
        },
        marker(){
            return this.$store.state.map.marker
        },
        language(){
            return this.$store.state.i18n.translations
        }
    },
    methods: {
         ...mapActions([
            'getMapAreaList',
            'areaGameTaskPages',
            'userInfoDetail'
            ]),
        change(key){
          this.$i18n.set(key);
          window.localStorage.setItem('lang',key)
          userInfoUpdate({userId:this.$store.state.user.userId,userLanguage:key},false)
          this.areaGameTaskPages()
          this.getMapAreaList()
          this.userInfoDetail() 
          busiInfoDetail({busiInfoId:this.marker.busiInfoId}).then(res=>{
              this.$store.commit('setMarker',res.data.obj)
          })
          document.addEventListener("deviceready", (e) => {
            window.plugins.jPushPlugin.setTags([key])
          })
       },
    }
}

</script>
<style lang="less">

</style>