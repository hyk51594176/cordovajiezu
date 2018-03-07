import * as types from '../types'
 
export default {
    state:{
        missionList:[],
        activeMisson:null,
        reminder:null
    },
    mutations:{
        [types.AREAGAMETASK_PAGES](state,missionList ){
            state.missionList = missionList||[]
        },
        setActiveMisson(state,activeMisson){
            state.activeMisson = activeMisson
        },
        setReminder(state,reminder){
            state.reminder = reminder
        },
    },
   
}