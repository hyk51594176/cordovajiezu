import GPS from '../util/gps'
import * as types from 'types'
import  api from 'api'
export default {
    setMyPostion({commit}){
        navigator.geolocation.watchPosition((position)=>{
            // const mypostion=GPS.gcj_encrypt(position.coords.latitude,position.coords.longitude)
            const mypostion = {
                lat:position.coords.latitude,
                lng:position.coords.longitude,
            }
            commit('setMyPostion',mypostion)
        }, (msg)=>{
              console.log(msg)
        },{
            maximumAge: 3600000,
            timeout: 10000,
            enableHighAccuracy: true,
        });
    },
    getMapAreaList({commit}){
       return  api.getMapAreaList().then(res=>{
            commit(types.MAPAREASET_GETMAPAREALIST,res.data.obj)
           return res.data.obj[0].busiInfo
        })
    },
    userInfoLogin({commit},params){
      return  api.userInfoLogin(params).then(res=>{
            commit(types.USERINFO_USERLOGIN,res.data.obj)
            localStorage.setItem('user',JSON.stringify(res.data.obj))
            return res
        })
    },
    userInfoDetail({commit,state},params){
        return api.userInfoDetail({ userId:state.user.userId }, false).then(res=>{
            let user = res.data.obj;
            user.photoUrlFile=user.avatar
             commit('updateUser',{ ...state.user,...user})
            localStorage.setItem('user',JSON.stringify(user))
            return res
        })
    },
    userInfoTaskPoint({commit,state},params){
       return api.userInfoTaskPoint({userId:state.user.userId},false).then(res=>{
            let user = {...state.user}
            user.point = res.data.obj.point
            user.taskNum = res.data.obj.taskNum
            commit('updateUser',user)
             return res
        })
    },
     areaGameTaskPages({commit,state},params){
       return api.areaGameTaskPages({userId:state.user.userId},false).then(res=>{
                commit(types.AREAGAMETASK_PAGES,res.data.obj)
                 return res
            })
    },
    //消息通知管理，暂未启用全局状态管理，以后需求有变，加入全局
    msgSystemNotice({commit},params){
         return api.msgSystemNotice(params,false).then(res=>{
                commit('updateNoticeList',res.data.obj.data||[])
                commit('updateNoticeTotal',res.data.obj.recordsTotal)
                 return res
            })
    }
}