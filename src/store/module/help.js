let chartList =[]
if(localStorage.chartList){
    chartList=JSON.parse(localStorage.chartList)
}

export default   {
    state: {
        chartList:chartList,
        customerService:null,//客服信息
        unread:0,//未读消息
        isActive:false//是否在聊天页面
    },
    mutations: {
        SOCKET_3(state,chart){
            if(!chart.type){
                chart.type='server';
                state.unread+=1;
                playAudio(state.isActive)
            }  
            let timeNow=getNow();
            if(timeNow)chart.time=timeNow
            state.chartList.push(chart)
            //保存100条聊天记录
            let list = state.chartList.filter((obj,index)=>{
                return index<state.chartList.length&&index>state.chartList.length-80
            })
            localStorage.chartList=JSON.stringify(list)
        },
       SOCKET_5(state){
            state.customerService=null
       },
       SOCKET_8(state){
            state.customerService=null
       },
        SOCKET_2(state,customerService){
            state.customerService=customerService
            customerService.type='server'
             state.chartList.push(customerService)
        },
        restUnread(state,isActive){
            state.unread=0
            state.isActive=isActive
        }
    },
}
let msgAudio = null
let myMedia = null; 
let dateNow = null


function getNow(){
    if(dateNow==null){
        dateNow =new Date();
          return getDateStr(dateNow,true)
    }else{
        if(Date.now()-dateNow.getTime()>1000*60*60*24){
             dateNow =new Date();
             return getDateStr(dateNow,true)
        }else if(Date.now()-dateNow.getTime()>1000*60*5){
                dateNow =new Date();
             return getDateStr(dateNow,false)
        }else{
            return false
        }
    }
}

function getDateStr(d,all){
     let str = d.toLocaleDateString()+" "+format(d.getHours().toString())+":"+format(d.getMinutes().toString())
    return str
}
function format(time){
    return time<10?('0'+''+time):time
} 

function playAudio(isActive) {
     if(msgAudio===null){
         msgAudio = new Audio();
         msgAudio.src ="static/public/msg.mp3"
     }
      if(!isActive){
          navigator.vibrate(1000);
          msgAudio.play()
      }
//    let src = "static/msg.mp3";
//    if(myMedia === null) {
//       myMedia = new Media(src, onSuccess, onError);
//       function onSuccess() {
//          console.log("playAudio Success");
//       }
//       function onError(error) {
//          console.log("playAudio Error: " + error.code);
//       }
//    }  
//     myMedia.play();
   
}