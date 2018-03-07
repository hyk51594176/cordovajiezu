import Vue from 'vue'
import FastClick from 'fastclick'
import { ToastPlugin } from 'vux'
import { ConfirmPlugin } from 'vux'

import { AlertPlugin } from 'vux'

require('es6-promise').polyfill();
import router from './router'
import store from './store'
import App from './App'
import locale from './Language'
import VueSocketio from './plugin/socket';
import './assets/css/villeroad.css'
import {
    socketConf
} from 'api/config';
FastClick.attach(document.body)
Object.keys(locale).forEach((key) => {
    Vue.i18n.add(key, locale[key])
})
Vue.i18n.fallback('en')
if (localStorage.getItem('lang')) Vue.i18n.set(localStorage.getItem('lang'))
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(VueSocketio, socketConf, store);

Vue.use(ToastPlugin);
//监听route的前进后退事件
['back', 'push', 'replace'].forEach(method => {
    let _method = router[method].bind(router)
    router[method] = function(location) {
        if (method === 'back') {
            store.commit('updateDirection', 'reverse')
        } else {
            store.commit('updateDirection', 'forward')
        }
        _method(location)
    }
})

function back() {

    if (store.state.sideright) {
        store.commit('updateSideRight')
    } else if (store.state.showdialog !== false) {
        store.commit('updateShowdialog', false)
    } else if (store.state.isLoading) {
        store.commit('updateLoadingStatus', false)
    } else if (store.state.mapDialog) {
        store.commit('updateMapDialog', false)
        store.state.map.map.closeDialog();
    } else if (Keyboard.isVisible) {
        Keyboard.hide();
    } else {
        router.back()
    }

}
document.addEventListener("deviceready", onDeviceReady, false);
router.beforeEach((to, from, next) => {
    store.commit('updateLoadingStatus', true)
    from.meta.scrollY = window.scrollY
    Object.assign(to.meta, to.params, to.query);
    if (!store.state.user && !to.meta.isAuth && to.path != '/') {
        next('/login')
    } else {
        next()
    }
})
router.afterEach(route => {
    store.commit('updateLoadingStatus', false)
    if (route.meta.scrollY) {
        setTimeout(function() {
            window.scrollTo(0, route.meta.scrollY)
        }, 0)
    } else {
        window.scrollTo(0, 0)
    }
})
let vm = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app-box')

function setLanguage() {
    if (localStorage.getItem('lang')) {
        Vue.i18n.set(localStorage.getItem('lang'))
        setTags(localStorage.getItem('lang'))
    } else {
        //获取系统语言
        navigator.globalization.getPreferredLanguage((language) => {
            Object.keys(locale).forEach((key) => {
                if (language.value.indexOf(key) > -1) {
                    localStorage.lang = key;
                    setTags(key)
                    Vue.i18n.set(key)
                }
            })
        }, (msg) => {});
    }
}

function setTags(key) {
    if (localStorage.isPush === 'no_push') {
        window.plugins.jPushPlugin.setTags(['no_push'])
    } else {
        window.plugins.jPushPlugin.setTags([key])
    }
}

function onDeviceReady() {



    Keyboard.hideFormAccessoryBar(true);
    document.addEventListener('backbutton', (e) => {
        let route = router.currentRoute
        if (route.name === 'bigMap' || route.name === 'login' || route.name === 'bootPage') {
            navigator.app.exitApp();
        } else {
            back()
        }
    })
    chcp.getVersionInfo((err, data) => {
        store.commit('upDateCurrentWebVersion', data.currentWebVersion)
        console.log('Current web version: ' + data.currentWebVersion);
        console.log('Previous web version: ' + data.previousWebVersion);
        console.log('Loaded and ready for installation web version: ' + data.readyToInstallWebVersion);
        console.log('Application version name: ' + data.appVersion);
        console.log('Application build version: ' + data.buildVersion);
    });


    //监听位置信息
    store.dispatch('setMyPostion')
        //当前系统运行平台
    store.commit('setPlatformId', cordova.platformId)



    //设置默认语言环境
    setLanguage()
    document.addEventListener("jpush.openNotification", function(event) {
            let extras = event.extras
            let alertContent = ''
            let isLocal = false;
            if (device.platform == "Android") {
                alertContent = event.alert
                isLocal = event.extras.isLocal || false
            } else {
                alertContent = event.aps.alert
                isLocal = event.isLocal || false
            }
            //本地推送加入系统消息通知TODO入口 TODO 暂无需求
            isLocal && store.commit('updateNotice')
        }, false)
        //监听网络状态
    document.addEventListener("offline", e => {
        store.commit('updateNetWorkType', navigator.connection.type)
    }, false);
    document.addEventListener("online", e => {
        store.commit('updateNetWorkType', navigator.connection.type)
    }, false);
}