import * as types from '../types'
 
export default {
    state:{
        myPostion:{
            lat: 0,
            lng:0
        },
        markerList:[],
        marker:null,
        clickable:true,
        activeArea:null,
        map:null,
    },
    mutations:{
        
        setMyPostion(state,myPostion){
            state.myPostion=myPostion
        },
        [types.MAPAREASET_GETMAPAREALIST](state,markerList ){
             
            state.markerList=markerList||[]
        },
        setActiveArea(state,activeArea){
            state.activeArea=activeArea
        },
        setMarker(state,marker){
            state.marker=marker
        },
       updatedClickable (state,clickable) {
           state.clickable=clickable
       },
        updateMap(state,map){
            state.map=map
        }
    }
}