export default {
    state:{
         noticeList:[],
         noticeTotal:0,
     
    },
    mutations:{
         updateNoticeList(state,noticeList){
            state.noticeList=[...state.noticeList,...noticeList]
        },
         updateNoticeTotal(state,noticeTotal){
            state.noticeTotal= noticeTotal
        },
    }
}