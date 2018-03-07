import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n';
import actions from './actions'
import getters from './getters'
import modules from './module';
import * as types from 'types';
Vue.use(Vuex)
let user = null
if (localStorage.user) {
    user = JSON.parse(localStorage.user)
}
const state = {
    isLoading: false,
    direction: 'forward',
    sideright: false,
    showdialog: false,
    mapDialog: false,
    platformId: null,
    user: user,
    notice: 0,
    currentWebVersion: '',
    windowSize: {
        width: '100%',
        height: '100%'
    },
    netWorkType: null
}
const mutations = {
    [types.USERINFO_USERLOGIN](state, user) {
        state.user = user
    },
    updateWindowSize(state, windowSize) {
        state.windowSize = windowSize
    },
    updateNetWorkType(state, netWorkType) {
        state.netWorkType = netWorkType
    },
    upDateCurrentWebVersion(state, currentWebVersion) {
        state.currentWebVersion = currentWebVersion
    },
    updateUser(state, user) {
        state.user = user
    },
    updateMapDialog(state, mapDialog) {
        state.mapDialog = mapDialog
    },
    logout(state) {
        state.user = null
    },
    updateNotice(state) {
        state.notice += 1
    },
    restNotice(state) {
        state.notice = 0
    },
    setPlatformId(state, platformId) {
        state.platformId = platformId
    },
    updateLoadingStatus(state, isLoading) {
        state.isLoading = isLoading
    },
    SOCKET_6(state, m) {
        console.log('收到了', m)
    },
    updateDirection(state, direction) {
        state.direction = direction
    },
    updateSideRight(state) {
        state.sideright = !state.sideright
    },
    updateShowdialog(state, showdialog) {
        state.showdialog = showdialog
    }
}
const store = new Vuex.Store({
    modules: {
        ...modules,
        i18n: vuexI18n.store,
    },
    state,
    mutations,
    actions,
    getters
})
Vue.use(vuexI18n.plugin, store);

export default store