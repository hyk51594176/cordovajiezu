<template>
    <div class="home mypage">
        <div class="mypage-container">
            <div class="mypage-info">
                <div class="avatar"  @click="changePerson('photoUrlFile')">
                    <img :src="userInfo.avatar||''" @error="$event.target.src=errorImg" >
                </div>
                <div class="mission-point">
                  <div class="point" @click="$router.push({name:'myPoint'})">
                       <span class="mission-point-info">
                            {{$t('myPage.point')}}
                            <strong>{{$store.state.user.point||0}}</strong>
                       </span>
                    </div>
                    <div class="mission" @click="$router.push({name:'mission'})">
                        <span class="mission-point-info">
                            {{$t('myPage.mission' )}} 
                            <strong>{{$store.state.user.taskNum||0}}</strong>
                        </span>
                    </div>
                  
                </div>
            </div>
            <div class="mypage-conner vux-1px-tb">
                <cell :title="$t('gengduo.lang')" is-link  @click.native="updateShowdialog('changelanguage')" /> 
                <!--<cell :title="$t('theme')" is-link  @click.native="updateShowdialog('changetheme')"></cell>-->
                <!--<cell :title="$t('personCenter.title')"  is-link @click.native="$router.push('/personalCenter')" /> -->
               <x-switch :title="$t('myPage.isPush')" v-model="isPush"></x-switch>
                <!--<cell :title="$t('order.title')"  is-link @click.native="$router.push('/order')"></cell>-->
            <cell :title="$t('personCenter.realName')"
                  :value="userInfo.realName"
                  is-link
                  @click.native="changePerson('realName')" />
            <cell :title="$t('personCenter.nikeName')"
                  :value="userInfo.nikeName"
                  is-link
                  @click.native="changePerson('nikeName')" />
                   <cell :title="$t('personCenter.userCountry')"
                  :value="userInfo.userCountry" /> 
        <!--@click.native="changePerson('userCountry')"-->
            <cell :title="$t('personCenter.gender')"
                  :value="userInfo.gender===0?$t('changeperson.unknown'):(userInfo.gender===1?$t('changeperson.boy'):$t('changeperson.girl'))"
                  is-link
                  @click.native="changePerson('gender')" /> 
                  <!--@click.native="changePerson('passportNo')"-->
            <!--<cell :title="$t('personCenter.passportNo')"
                  :value="userInfo.passportNo"  />-->
                      <cell :title="$t('personCenter.userCode')"   is-link @click.native="changePerson('userCode')">
                    <vueqrious :value='userInfo.userCode' :size='35' :padding='8' v-if="userInfo.userCode"/> 
                  </cell>
          <cell :title="$t('personCenter.changePawd')"
                  is-link
                  @click.native="$router.push('/changePawd')"/> 
            </div>
        </div>
        
      
    
        <nav class="mtabar"
             :style='$store.state.themestyle.theme.tabbar'>
            <router-link to="/myPoint"
                         tag='div'
                         class="detail">
                <p>  {{$t('myPage.point')}}</p>
            </router-link>
          
            <router-link :to="{path:'/userFavoriteBusinfo',query:{title:$t('myPage.favor')}}"
                         tag='div'
                         class="help">
                <p>  {{$t('myPage.favor')}}</p>
            </router-link>
            <router-link :to="{name:'mission'}"
                         tag='div'
                         class="mission">
                <!--<icon name="renwu"  scale="2.2" :color="$route.name==='renwu'?theme.active:theme.tabbar.color" />-->
                <p>  {{$t('myPage.mission')}}</p>
            </router-link>
        </nav>
    </div>
</template>
<script>
import { Cell,XSwitch } from 'vux'
import { mapMutations,mapActions } from 'vuex'
 import vueqrious  from '../../plugin/vue-qriously';
 import errorImg from '../../assets/image/logo192.png';
export default {
    name: 'home',
    data() {
        return {
            errorImg:errorImg,
            isPush:localStorage.isPush == 'no_push'?false:true
        }
    },
    watch:{
        isPush(flag){
            if(flag){
                localStorage.isPush = true;
                 window.plugins.jPushPlugin.setTags([localStorage.getItem('lang')])
            }else{
                localStorage.isPush = 'no_push';
                 window.plugins.jPushPlugin.setTags(['no_push'])
            }
        }
    },
    computed:{
        userInfo(){
            return this.$store.state.user
        }
    },
    components: {
        Cell,
        XSwitch,
        vueqrious
    },
    created () {
        this.userInfoDetail() 
        this.userInfoTaskPoint() 
    },
    methods: {
        ...mapMutations([
            'updateShowdialog'
        ]),
        ...mapActions([
            'userInfoTaskPoint',
            'userInfoDetail'
        ]),
         changePerson(type) {
            this.$router.push({
                path: '/changePerson',
                query: {
                    title: `personCenter.${type}`,
                    key: type,
                    value: this.userInfo[type]
                }
            })
        },
    }

}

</script>
<style lang="less">
.mypage{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .mypage-conner{
        background: #ffffff;
    }
    .avatar{
    
        height: 180px;
        
        text-align: center;
        img{
           height: 180px;
           width: 180px;
            border-radius: 50%;
            
        }
    }
    .mypage-info{
        text-align: center;
        background-color:#f2f2f2;
    }
    .mission-point{
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding:7px 0;
        color:#666;
        line-height:1.3;
     .mission-point-info{
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center
     }  
        div::before{
        	content:'';
        	display:block;
        	float:left;
        	margin-right:7px;
        	background:url('../../assets/image/icon-mtabar.png') no-repeat #fff;
        	width:45px;height:45px;
        	border-radius:25px;
        }
        div.point::before{
        	background-position:50% -652px;
        	background-size:85%;
        }
        div.mission::before{
        	background-position:90% -666px !important;
        	background-size:80%;
        }
      	strong{
      		display:block;
      		line-height:1;
      		font-size:24px;
      		color:#3a5169;
      		text-align:right;
      	}
    }
    .mypage-container{
        overflow-y:auto;
        -webkit-overflow-scrolling: touch;
        // padding-bottom: 60px; 
    }
}
</style>