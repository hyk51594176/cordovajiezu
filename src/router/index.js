import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/map/map'
Vue.use(Router)
// import map from 'components/map'

function layzLoading(path) {
  return () => import(`components/${path}.vue`)
}
 
const routes = [
  {
    path: '/home',
    component: Home,
    name: 'map',
    meta: {
      keep: true,
      title: 'tabbar.map',
    },

  }, {
    path: '/renwu',
    name: 'renwu',
    component: layzLoading('mine/renwu'),
    meta: {
      title: 'tabbar.renwu',
      tabar: true,

    }
  }, {
    path: '/myPage',
    name: 'myPage',
    component: layzLoading('mine/myPage'),
    meta: {
      title: 'myPage.title',
      tabar: true,

    }
  }, {
    path: '/help',
    name: 'help',
    component: layzLoading('mine/help'),
    meta: {
      title: 'tabbar.bangzhu',
      tabar: true,
      keep: true,
 
    }
  }, {
    path: '/test',
    name: 'test',
    component: layzLoading('test'),
    meta: {
      title: 'test',
    }
  },{
    path: '/personalCenter',
    name: 'personalCenter',
    component: layzLoading('account/personalCenter'),
    meta: {
      title: 'personCenter.title',
      isAuth:true
    }
  },{
    path: '/changePerson',
    name: 'changePerson',
    component: layzLoading('account/changePerson'),
    meta: {
      title: ' ',
        
    }
  },{
    path: '/changePawd',
    name: 'changePawd',
    component: layzLoading('account/changePawd'),
    meta: {
      title: 'personCenter.changePawd',
    }
  },
  
  {
    path: '/login',
    name: 'login',
    component: layzLoading('account/login'),
    meta: {
      title: 'loginpage.login',
      header: false,
      headerright: false,
       isAuth:true,
    }
  },
   {
    path: '/bootPage',
    name: 'bootPage',
    component: layzLoading('bootPage'),
    meta: {
      backshow: false,
      header: false,
      isAuth:true
    }
  },
  {
    path: '/findpass', 
    name: 'findpass',
    component: layzLoading('account/findpass'),
    meta: {
      title: 'findpasspage.title',
      headerright: false,
      isAuth:true,
    }
  },
  {
    path: '/signUp', 
    name: 'signUp',
    component: layzLoading('account/signUp'),
    meta: {
      title: 'signUppage.title',
      headerright: false,
      isAuth:true,
    }
  }, {
    path: '/bigMap', 
    name: 'bigMap',
    component: layzLoading('map/bigMap'),
    meta: {
      backshow: false,
      header: false
    }
  },
  {
    path: '/areaList',
    name: 'areaList',
    component: layzLoading('map/areaList'),
    meta: {
      title: 'areaList.title',
    }
  },
  {
    path: '/markerDetail',
    name: 'markerDetail',
    component: layzLoading('map/markerDetail'),
    meta: {
      title: '',
    },

  }, {
    path: '/PrivacyAgreement',
    name: 'PrivacyAgreement',
    component: layzLoading('account/PrivacyAgreement'),
    meta: {
      title: 'PrivacyAgreement.title',
      headerright: false,
       isAuth:true
    }
  },{
    path: '/store',
    name: 'store',
    component: layzLoading('business/store'),
    meta: {
      title: 'store.title',
    }
  },
   {
    path: '/purchase',
    name: 'purchase',
    component: layzLoading('business/purchase'),
    meta: {
      title: 'store.purchase',
    }
  },
  {
    path: '/myPoint',
    name: 'myPoint',
    component: layzLoading('mine/myPoint'),
    meta: {
      title: 'myPage.point',
    }
  },
  {
    path: '/mission',
    name: 'mission',
    component: layzLoading('mine/mission'),
    meta: {
      title: 'myPage.mission',
    }
  },{
    path: '/endmission',
    name: 'endmission',
    component: layzLoading('mine/endmission'),
    meta: {
      title: 'mission.discription',
    }
  },{
    path: '/acceptmission',
    name: 'acceptmission',
    component: layzLoading('mine/acceptmission'),
    meta: {
      title: 'mission.discription',
    }
  },{
    path: '/alarmList',
    name: 'alarmList',
    component: layzLoading('mine/alarmList'),
    meta: {
      title: 'alarmList.title',
    }
  },{
    path: '/story',
    name: 'story',
    component: layzLoading('mine/story'),
    meta: {
      title: 'story.title',
    }
  },{
    path: '/cartoon',
    name: 'cartoon',
    component: layzLoading('mine/cartoon'),
    meta: {
      title: 'cartoon.title',
    }
  }, 
  {
    path: '/storyDetail',
    name: 'storyDetail',
    component: layzLoading('mine/storyDetail'),
    meta: {
      title: 'story.title',
    }
  },  {
    path: '/order',
    name: 'order',
    component: layzLoading('business/order'),
    meta: {
      title: 'order.title',
    }
  },
  
  {
    path: '/userFavoriteBusinfo',
    name: 'userFavoriteBusinfo',
    component: layzLoading('mine/userFavoriteBusinfo'),
    meta: {
      title: ' ',
    }
  },
  {
    path: '/storyRelated',
    name: 'storyRelated',
    component: layzLoading('mine/storyRelated'),
    meta: {
      title: 'story.title',
    }
  },

]
export default new Router({
  routes
})
