import axios from 'axios';
import Vue from 'vue';
import store from '../store'
import * as types  from '../store/types'
 import {
     baseURL
 } from './config.js';
 
export const USERINFO_AVATAR = baseURL+'/userinfo/Avatar'
axios.interceptors.request.use(function (config) {
    if(localStorage.lang)config.headers['accept-language']=localStorage.lang 
    return config;
}, function (error) {
 
    return Promise.reject(error);
});
axios.defaults.withCredentials=true
axios.defaults.timeout = 2500;
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});












export const msgSystemNotice = (data,showMsg) => request({url:baseURL+types.MSTSYSTEMNOTICE_PAGES,data,showMsg})
 
 
//商家
export const getBusiInfoList = (data,showMsg) => request({url:baseURL+types.BUSIINFO_LIST,data,showMsg})
export const busiInfoPages = (data,showMsg) => request({url:baseURL+types.BUSIINFO_PAGES,data,showMsg})
export const busiInfoDetail = (data,showMsg) => request({url:baseURL+types.BUSIINFO_DETAIL,data,showMsg})

export const busiItemPages = (data,showMsg) => request({url:baseURL+types.BUSIITEM_PAGES,data,showMsg})

export const sysDictionariesGetByType = (data,showMsg) => request({url:baseURL+types.SYSDICTIONARIES_GETBYTYPE,data,showMsg})


//引导页
export const appGuidPage = () => request({url:baseURL+types.APPGUIDPAGE_GETALL,data:null,showMsg:false})

//用户信息管理
export const userInfoLogin = (data,showMsg) => request({url:baseURL+types.USERINFO_USERLOGIN,data,showMsg})
export const userInfoRegist = (data,showMsg) => request({url:baseURL+types.USERINFO_REGIST,data,showMsg})
export const userInfoFogetPasswd = (data,showMsg) => request({url:baseURL+types.USERINFO_FOGETPASSWD,data,showMsg})
export const userInfoChangePasswd = (data,showMsg) => request({url:baseURL+types.USERINFO_CHANGEPASSWD,data,showMsg})
export const userInfoUpdate = (data,showMsg) => request({url:baseURL+types.USERINFO_UPDATE,data,showMsg} )
export const userInfoDetail = (data,showMsg) => request({url:baseURL+types.USERINFO_DETAIL,data,showMsg})
export const userInfoGetsmsCode = (data,showMsg) => request({url:baseURL+types.USERINFO_GETSMSCODE,data,showMsg})
export const userInfoChexkStatus = (data,showMsg) => request({url:baseURL+types.USERINFO_CHECKSTATUS,data,showMsg})
export const userInfoGetVcode = (data,showMsg) => request({url:baseURL+types.USERINFO_GETVCODE,data,showMsg})


//地图区域

export const getMapAreaList = (data,showMsg=false) => request({url:baseURL+types.MAPAREASET_GETMAPAREALIST,data,showMsg})
//故事漫画
export const appGetStory = (data,showMsg) => request({url:baseURL+types.APPARTICLE_STORY_GET,data,showMsg})
export const appGetCartoon = (data,showMsg) => request({url:baseURL+types.APPARTICLE_CARTOON_GET,data,showMsg})
export const appArticleAddColl = (data,showMsg) => request({url:baseURL+types.APPARTICLE_ADDCOLL,data,showMsg})
export const appArticleDelColl = (data,showMsg) => request({url:baseURL+types.APPARTICLE_DELCOLL,data,showMsg})
export const articleCommentPages = (data,showMsg) => request({url:baseURL+types.ARTICLECOMMENT_PAGES,data,showMsg})
export const articleCommentAdd = (data,showMsg) => request({url:baseURL+types.ARTICLECOMMENT_ADD,data,showMsg})
export const articleDetail = (data,showMsg) => request({url:baseURL+types.APPARTICLE_DETAIL,data,showMsg})


export const userFavoriteBusInfo = (data,showMsg) => request({url:baseURL+types.USERFAVORITE_BUSINFO,data,showMsg})
export const userFavoriteCancel = (data,showMsg) => request({url:baseURL+types.USERFAVORITE_CANCEL,data,showMsg})
export const userFavoriteGetByUserId = (data,showMsg) => request({url:baseURL+types.USERFAVORITE_GETBYUSERID,data,showMsg})
//订单
export const userOrderAdd = (data,showMsg) => request({url:baseURL+types.USERORDER_ADD,data,showMsg})
export const payGetsina = (data,showMsg) => request({url:baseURL+types.PAY_GETSINA,data,showMsg})
export const userOrderPage = (data,showMsg) => request({url:baseURL+types.USERORDER_PAGE,data,showMsg})
export const userOrderDelete = (data,showMsg) => request({url:baseURL+types.USERORDER_DELETE,data,showMsg})
export const userOrderReturnAdd = (data,showMsg) => request({url:baseURL+types.USERORDER_RETURN_ADD,data,showMsg})

export const userTaskProcessStart = (data,showMsg) => request({url:baseURL+types.USERTASKPROCESS_START,data,showMsg})
export const userTaskProcessFinish = (data,showMsg) => request({url:baseURL+types.USERTASKPROCESS_FINISH,data,showMsg})
export const userTaskProcessGetById = (data,showMsg) => request({url:baseURL+types.USERTASKPROCESS_GETBYID,data,showMsg})
export const userTaskProcessList = (data,showMsg) => request({url:baseURL+types.USERTASKPROCESS_LIST,data,showMsg})
export const areaGameTaskPages = (data,showMsg) => request({url:baseURL+types.AREAGAMETASK_PAGES,data,showMsg})

export const userPiontGet = (data,showMsg) => request({url:baseURL+types.USERPIONTRECORD_ADDRECORE,data,showMsg})
export const userPiontUsed = (data,showMsg) => request({url:baseURL+types.USERPIONTRECORD_USEDRECORE,data,showMsg})
export const userInfoTaskPoint = (data,showMsg) => request({url:baseURL+types.USERINFO_TASK_POINT,data,showMsg})









function request( { url = '', data = {} , showMsg = true, method='post',config={} } ){
    showMsg&&store.commit('updateLoadingStatus', true)
    return new Promise((resolve,reject)=>{
         axios[method](url,data,config)
         .then((res)=>{
             showMsg&&store.commit('updateLoadingStatus', false)
            if(res.statusText==='OK'&&res.data){
                if(!res.data.result){
                    if(res.data.description){
                        showMsg&&Message(res.data.description)
                    }
                     reject({errmsg:res.data.description,errTpye:'RESULT'})
                }else{
                    if(res.data.description){
                        showMsg&&Message(res.data.description)
                    }
                     resolve(res)
                }
            } else{
                showMsg&&Message(res.statusText);
                reject({errmsg:res.statusText,errTpye:'STATUS'})
            }
        }).catch((err)=>{
           showMsg&&store.commit('updateLoadingStatus', false)
             showMsg && Message(err.message);
             reject({errTpye:'ERROR',errmsg:err.message})
        })
    })
}

function Message(Text) {
	Vue.$vux.toast.show({
		text: Text,
		position: 'bottom',
		type: 'text',
		width: 'auto',
        time:3000
	})
}