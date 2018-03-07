import * as types from '../types';
import api from 'api';
export default {
    state: {
        busiInfoList: [],
        busiInfoMsg: null
    },
    mutations: {
        [types.BUSIINFO_LIST](state, busiInfoList = []) {
            state.busiInfoList = busiInfoList
        },
        SOCKET_21(state, busiInfoMsg) {
            state.busiInfoMsg = busiInfoMsg
        }
    },
    actions: {
        getBusiInfoList({ commit, state }, params) {
            return api.getBusiInfoList(params, false)
                .then(res => {
                    // let oldarr = [...state.busiInfoList]
                    let newarr = res.data.obj || []
                        // newarr.forEach(obj=>{
                        //     let flag=oldarr.some((m,index)=>{
                        //         if(m.busiInfoId==obj.busiInfoId){
                        //            oldarr[index]=obj
                        //         }
                        //         return m.busiInfoId==obj.busiInfoId
                        //     })
                        //     if(!flag){
                        //         oldarr.push(obj)
                        //     }
                        // })
                    commit(types.BUSIINFO_LIST, newarr)
                    return newarr
                })
        }
    }
}