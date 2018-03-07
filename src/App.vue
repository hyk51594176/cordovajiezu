<template>
  <div id="app"
       style="overflow:hidden">
    <header class="mheader"
            :style="headerStyle"
            v-show='$route.meta.header===undefined&&$route.path!=="/"'>
      <div class='headerleft '>
        <div class="ion-chevron-left"
             style="font-size:23px;width:60px;"
             @click='$router.back()'
             v-show='$route.meta.backshow===undefined' />
      </div>
  
      <div class="title">{{titleName}}</div>
      <div class='headerright'>
        <!--<div class="ion-android-home" style="font-size:23px;width:60px" @click="$router.replace({name:'bigMap'})" v-show='$route.meta.headerright===undefined' />-->
        <div class="ion-more"
             style="font-size:23px;width:60px"
             @click='updateSideRight'
             v-show='$route.meta.headerright===undefined' />
      </div>
      <badge :text="$store.state.notice"
             v-show="$store.state.notice"
             class="shansuo"
             style="position:absolute;top:8px;right:8px;"></badge>
    </header>
  
    <div class="mask"
         v-if='sideright'
         @click='updateSideRight'> </div>
  
    <transition name="pop-right">
      <group title='VILLEROAD'
             class="sideright"
             v-show='sideright'
             :style="theme.sideright">
        <cell :title="$t('home')"
              is-link
              @click.native="goto({name:'bigMap'}) ">
          <i class="ion-android-home"
             slot="icon" />
        </cell>
        <cell :title="$t('myPage.title')"
              is-link
              @click.native="goto('/mypage')">
          <i class="ion-person"
             slot="icon" />
        </cell>
        <cell :title="$t('story.title')"
              is-link
              @click.native="goto('/story')">
          <i class="ion-android-apps"
             slot="icon" />
        </cell>
        <!--<cell :title="$t('cartoon.title')" is-link @click.native="goto('/cartoon')">
            <i class="ion-ios-paper" slot="icon" />
          </cell>-->
        <cell :title="$t('camera.title')"
              @click.native="showCarmeImg"
              is-link>
          <i class="ion-camera"
             slot="icon" />
        </cell>
        <cell title="ARTest"
              @click.native="ARCamera(true)"
              is-link>
          <i class="ion-camera"
             slot="icon" />
        </cell>
        <cell :title="$t('mission.title')"
              is-link
              @click.native="goto('/mission')">
          <i class="ion-flag"
             slot="icon" />
        </cell>
        <cell :title="$t('myPage.favor')"
              is-link
              @click.native="goto({path:'/userFavoriteBusinfo',query:{title:$t('myPage.favor')}})">
          <i class="ion-star"
             slot="icon" />
        </cell>
        <cell :title="$t('alarmList.title')"
              is-link
              @click.native="goto('/alarmList')">
          <i class="ion-ios-bell"
             slot="icon" />
          <badge :text="$store.state.notice"
                 v-show="$store.state.notice"
                 slot="child"
                 class="shansuo"></badge>
  
        </cell>
        <cell :title="$t('logout')"
              is-link
              @click.native="goto('/login')">
          <i class="ion-power"
             slot="icon" />
        </cell>
      </group>
    </transition>
    <div class="routdiv"
         :style='styles'>
      <transition :name="classname"
                  @enter="beforeEnter">
        <router-view v-if='!$route.meta.keep'></router-view>
      </transition>
      <transition :name="classname"
                  @enter="beforeEnter">
        <keep-alive>
          <router-view v-if='$route.meta.keep'></router-view>
        </keep-alive>
      </transition>
    </div>
    <x-dialog v-model="showdialog"
              class="dialog-demo"
              :scroll="false"
              hide-on-blur>
      <component :is="showdialog"
                 @showCarme="showCarme"
                 :completedMisston='completedMisston' />
    </x-dialog>
    <!--<div class="mask mask-loading" v-show='isLoading' >
            <img src="./assets/image/game-a01.gif" >
          </div>-->
    <loading v-show='isLoading'
             :text="$t('loading')"> </loading>
  </div>
</template>

<script>

import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
import {
  Cell,
  Group,
  XDialog,
  Loading,
  Badge
} from 'vux'
import {
  userInfoChexkStatus,
  userTaskProcessStart
} from 'api/api';
import changelanguage from './dialogcomm/changeLanguage'
import changetheme from './dialogcomm/changeTheme'
import carmeimg from './dialogcomm/carmeImg'

export default {
  name: 'app',
  data() {
    return {
      height: document.documentElement.clientHeight
    }
  },

  created() {

    this.getMapAreaList({}, true).then(marker => {
      this.$store.commit('setMarker', marker)
    })
    if (this.user) this.areaGameTaskPages()

    if (!window.localStorage.getItem('firstStart')) {
      this.$router.replace({ name: 'bootPage' })
    } else {
      if (!this.user) {
        this.$router.replace({ name: 'login' })
      } else {
        userInfoChexkStatus({ userId: this.user.userId }, false).then(res => {
          this.$router.replace({ name: 'bigMap' })
        }).catch(err => {
          if (err.errTpye == 'RESULT') {
            this.goto('/login')
          } else {
            this.$router.replace({ name: 'bigMap' })
          }
        })
      }
    }
    //监听更新失败，到应用市场更新
    document.addEventListener('chcp_updateLoadFailed', (eventData) => {
      let error = eventData.detail.error;
      if (error && error.code == chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
        let dialogMessage = this.$t('updateMsg');
        chcp.requestApplicationUpdate(dialogMessage, () => { }, () => { });
      }
    }, false);
    this.$store.commit('updateWindowSize', {
      width: document.documentElement.clientWidth + 'px',
      height: document.documentElement.clientHeight + 'px'
    })

  },
  methods: {
    ...mapMutations([
      'updateSideRight',
      'logout',
      'updatedClickable',
      'setActiveMisson'
    ]),
    ...mapActions([
      'getMapAreaList',
      'areaGameTaskPages',
    ]),
    getAreaName() {
      return this.markerList.filter(obj => obj.areaId == this.marker.areaId)[0]
    },

    showCarmeImg() {
      if (this.sideright) {
        this.updateSideRight()
      }

      if (this.completedMisston.length > 0) {
        this.showdialog = "carmeimg"
      } else {
        //TODO
        this.showCarme()
      }
    },
    showCarme(obj = {}) {
      this.showdialog = ""
      document.addEventListener("deviceready", (e) => {
        CameraPreview.stopCamera();
        CameraPreview.startCamera({
          camera: "back",
          tapPhoto: false,
          previewDrag: false,
          toBack: false,
          isAr: false,
          location: obj.areaCode || 'default',
          pauseTime: 3000,
          lat: this.myPostion.lat,
          lng: this.myPostion.lng
        }, e => {
          if (e === 'close') this.updatedClickable(true)
        }, e => {
          this.updatedClickable(true)
        });
      })
    },
    ARCamera(Ar) {
      if (this.sideright) {
        this.updateSideRight()
      }
      let isAR = this.reminder ? true : false

      let areaCode = isAR ? this.reminder.areaCode : (this.activeArea ? this.activeArea.areaCode : 'A1')
      let latlng = isAR ? { lat: this.reminder.lat, lng: this.reminder.lng } : {}
      if (Ar) {
        isAR = true;
        areaCode = this.getAreaName().areaCode
        let obj = this.missionList.filter(obj => {
          return obj.areaCode == areaCode
        })[0] || {}
        latlng = {
          lat: obj.lat,
          lng: obj.lng
        }
        this.setActiveMisson(obj)
      }

      document.addEventListener("deviceready", (e) => {
        CameraPreview.stopCamera();
        CameraPreview.startCamera({
          camera: "back",
          tapPhoto: false,
          previewDrag: false,
          toBack: false,
          isAr: isAR,
          location: areaCode,
          pauseTime: 3000,
          lat: latlng.lat,
          lng: latlng.lng
        }, e => {
          if (e === 'selected') {
            isAR && this.$router.push('/acceptmission')
          } else if (e === 'close') {
            this.updatedClickable(true)
          }
        }, e => {
          this.updatedClickable(true)
        });
      })
    },
    goto(route) {
      if (this.sideright) {
        this.updateSideRight()
      }
      if (route === '/login') {
        window.localStorage.removeItem('user')
        this.logout()
      }
      setTimeout(() => {
        this.$router.push(route)
      }, 250)
    },
    beforeEnter(el) {
      if (this.$route.meta.header === undefined) {
        let top = this.platformId === 'ios' ? 67 : 47;
        el.style.top = top + 'px'
        el.style.height = (this.height - top) + 'px'
      } else {
        el.style.top = '0px'
      }
    },
    startMission() {
      if (this.activeMisson.status == null) {
        userTaskProcessStart({
          gameId: this.activeMisson.gameId,
          userId: this.user.userId
        }, false).then(res => {
          this.activeMisson.status = 1
        })
      }
    }
  },
  components: {
    Cell,
    Group,
    XDialog,
    changelanguage,
    changetheme,
    carmeimg,
    Loading,
    Badge
  },
  watch: {
    busiInfoMsg(v) {
      const self = this
      this.$vux.confirm.show({
        title: self.$t('auth.title'),
        content: self.$t('auth.content', { name: v.ext.binfoName }),
        confirmText: this.$t('order.sure'),
        cancelText: this.$t('order.cancel'),
        onCancel() {
          self.$socket.emit(23, { "from": self.$store.state.user.userId, to: v.from })
        },
        onConfirm() {
          self.$socket.emit(22, { "from": self.$store.state.user.userId, to: v.from })
        }
      })
    },
    netWorkType(value) {
      if (value === Connection.NONE) {
        const self = this
        this.$vux.alert.show({
          title: this.$t('netWork.title'),
          buttonText: this.$t('order.sure'),
          content: this.$t('netWork.content'),
          onShow() {

          },
          onHide() {


          }
        })
      }
    },
    reminder(reminder) {
      if (this.activeMisson.status == null) {
        this.startMission(reminder)
      }
      if (localStorage.isPush === 'no_push') {
        return
      }
      document.addEventListener("deviceready", (e) => {
        if (this.platformId == 'ios') {
          window.plugins.jPushPlugin.prototype.addLocalNotificationForIOS(1000, reminder.remindContent, 1, Date.now(), { isLocal: true })
        } else {
          window.plugins.jPushPlugin.addLocalNotification(
            1000,
            reminder.remindContent,
            this.$t('mission.prompt'),
            Date.now(),
            1000,
            { isLocal: true })
        }
      })
      const self = this
      this.$vux.confirm.show({
        title: this.$t('mission.prompt'),
        confirmText: this.$t('order.sure'),
        cancelText: this.$t('order.cancel'),
        content: reminder.remindContent,
        onShow() {
          self.updatedClickable(false)
        },
        onHide() {
          self.updatedClickable(true)
        },
        onConfirm() {
          if (reminder.remindAct === 1) {
            self.ARCamera()
          } else if (reminder.remindAct === 2) {
            plugin.google.maps.external.launchNavigation({
              "from": self.$store.state.map.myPostion.lat + "," + self.$store.state.map.myPostion.lng,
              "to": reminder.lat + "," + reminder.lng
            });
          }
        }
      })
    }
  },

  computed: {
    ...mapState({
      direction: 'direction',
      theme: state => state.themestyle.theme,
      sideright: 'sideright',
      isLoading: 'isLoading',
      platformId: 'platformId',
      netWorkType: 'netWorkType',
      locales: state => state.i18n.translations,
      user: state => state.user,
      busiInfoMsg: state => state.busiInfo.busiInfoMsg,
      reminder: state => state.mission.reminder,
      activeMisson: state => state.mission.activeMisson,
      myPostion: state => state.map.myPostion,
      marker: state => state.map.marker,
      activeArea: state => state.map.activeArea,
      markerList: state => state.map.markerList,
      missionList: state => state.mission.missionList,
    }),
    completedMisston() {
      return this.missionList.filter(m => m.status === 2)
    },
    titleName() {
      if (this.$route.name == 'map') {
        return (this.getAreaName().stoneName || '') + " " + this.getAreaName().areaCode
      }
      return this.$t(this.$route.meta.title)
    },
    showdialog: {
      get() {
        return this.$store.state.showdialog
      },
      set(value) {
        this.$store.commit('updateShowdialog', value)
      }
    },
    classname() {
      // if(this.$route.name==='markerDetail') return 'pop-up' 
      if (this.$route.name === 'map') return ''
      return this.direction === 'forward' ? 'pop-in' : 'pop-out'
    },

    headerStyle() {
      return {
        ...this.theme.header,
        'padding-top': this.platformId === 'ios' ? "20px" : '0',

      }
    },

    styles() {
      // let height = document.documentElement.clientHeight;
      let out = 0;
      if (this.$route.meta.header === undefined) {
        if (this.platformId === 'ios') {
          out = 67
        } else {
          out = 47
        }
      }
      let obj = { height: this.height - out + 'px' }
      if (this.$route.name == 'help') obj = {}

      return obj
    }
  },
}

</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.shansuo {
  animation: blinking 0.3s linear 1s infinite alternate;

  @keyframes blinking {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }
}

.mask {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  z-index: 500;
  transition: opacity 400ms;
}

.mask-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  img {

    width: 150px;
  }
}

.sideright {
  width: 38%;
  height: 98%;
  top: 0px;
  padding-top: 10px;
  overflow: hidden;
  position: absolute;
  right: 0px;
  z-index: 99999;
  border-left: 1px solid rgba(0, 0, 0, .4);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.mheader {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  height: 46px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  transition: 400ms;
  opacity: 1;
  .headerleft {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 0;
    width: 60px;
    height: 100%;
    &:active {
      opacity: 0.3
    }
  }
  .headerright {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 0;
    width: 60px;
    height: 100%; // margin-right:10px;
    position: relative;

    &:active {
      opacity: 0.3
    }
  }
  .title {
    transition: 0ms;
    transform: translate3d(0px, 0px, 0px);
    opacity: 1;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

.routdiv {
  overflow: hidden; // position: relative;
}

.mtabar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  opacity: 1;
  border-top: 1px solid #ddd; // position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  align-items: center;
  padding-top: 5px;
  height: 50px;
  font-size: 10px;
  div {
    text-align: center;
    flex: 1
  }
}

body {
  background-color: #fbf9fe;
  overflow: hidden;
}





/**
  * vue-router transition
  */



.pop-right-enter-active,
.pop-right-leave-active,
{
  position: absolute;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
}

.pop-right-enter {
  transform: translate3d(50%, 0, 0);
  opacity: 0.8;
  z-index: 9999;
}

.pop-right-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  z-index: 9999;
}

.pop-right-leave {
  transform: translate3d(0, 0, 0);
  opacity: 0.8;
  z-index: 9999;
}

.pop-right-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 1;
  z-index: 9999;
}

.pop-up-enter-active,
.pop-up-leave-active,
{
  position: absolute;
  bottom: 0px;
  top: 47px;
  width: 100%;
  background: #fbf9fe;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0.6, 0.8, 1);
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
}
.pop-up-enter {
  transform: translate3d(0, 100%, 0);
  opacity: 1;
  z-index: 9999;
}

.pop-up-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  z-index: 9999;
}

.pop-up-leave {
  transform: translate3d(0, 100%, 0);
  opacity: 0.8;
  z-index: 9999;
}

.pop-up-leave-to {
  transform: translate3d(0, 0, 0);
  opacity: 0;
  z-index: 9999;
}

.pop-up-enter-active {
  box-shadow: -5px 0 3px rgba(0, 0, 0, .15);
}

.pop-down-leave-active {
  box-shadow: -5px 0 3px rgba(0, 0, 0, .15);
}

.pop-in-enter-active,
.pop-in-leave-active,
.pop-out-enter-active,
.pop-out-leave-active {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #fbf9fe;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0.6, 0.2, 1);
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
}

.pop-out-enter {
  transform: translate3d(-33%, 0, 0);
  opacity: 1;
  z-index: 1;
}

.pop-out-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  z-index: 1;
}

.pop-out-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  z-index: 2;
}

.pop-out-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 1;
  z-index: 2;
}

.pop-in-enter {
  transform: translate3d(100%, 0, 0);
  opacity: 1;
  z-index: 2;
}

.pop-in-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  z-index: 2;
}

.pop-in-leave {
  transform: translate3d(0, 0, 0);
  opacity: 0.8;
  z-index: 1;
}

.pop-in-leave-to {
  transform: translate3d(-33%, 0, 0);
  opacity: 0;
  z-index: 1;
}

.pop-in-enter-active {
  box-shadow: -5px 0 3px rgba(0, 0, 0, .15);
}

.pop-out-leave-active {
  box-shadow: -5px 0 3px rgba(0, 0, 0, .15);
}

.weui-toast__content {
  font-size: 13px !important;
}

.home {
  background: #fbf9fe;
  height: 100%;
  overflow: hidden;
}
</style>