<template>
    <div class="home chart-conner" :style="{height:height}">
        <div class="chart" id="chart" :style="{'padding-bottom':inputType?'280px':'60px'}">
            <div v-for="obj in chartList">
                <div v-if='obj.time' class='time'>
                    <span>
                        {{obj.time}}
                    </span>
                </div>
                <div class="client"
                     v-if="obj.type==='client'">
                    <div class="send">
                        <div class="help-neirong" v-html="obj.content">
                           
                        </div>
                    </div>
                    
                    <div class='titleicon'>
                        <img :src="$store.state.user.avatar||''" @error="$event.target.src=require('../../assets/image/logo192.png')">
                    </div>
                </div>
                <div class="server"
                     v-if="obj.type==='server'&&obj.content">
                    <div class='titleicon'>
                        <img src='../../assets/image/logo192.png'>
                    </div>
                    <div class="receive">
                        <div class="help-neirong" v-html="obj.content">
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
        <div  id="bottomBar">
            <div class="shuru" id="shuru">
                <div id="inputValue" contenteditable="true" 
                @click="inputType=''"
                    :style="{'border-bottom':'1px solid'+$store.state.themestyle.theme.themeColor}"
                        @input='onInput'  ></div> 
                <i class="seachicon ion-android-happy" 
                      style="font-size:30px"
                       :style="{color:$store.state.themestyle.theme.themeColor}"
                       @click="setInputType('emi')"/>
                <i class="seachicon ion-plus-round" 
                      style="font-size:30px"
                       :style="{color:$store.state.themestyle.theme.themeColor}"
                        v-show='!inputValue'
                       @click="setInputType('call')"/>
                <x-button mini class="btn" v-show='inputValue' @click.native='sendMsg' :style='$store.state.themestyle.theme.button'>{{$t('help.send')}}</x-button>
            </div>
            <div class='callcenter'
                 v-show="inputType==='call'">
                <div @click='addLocation'>
                    <i class="ion-ios-location" style="font-size:20px" :style="{color:$store.state.themestyle.theme.themeColor}"/>
                    <span> {{$t('location')}} </span>
                </div>
                <a href='skype:seoulilyo@gmail.com?call'>
                    <img src="../../assets/image/skype.png" alt="">
                   <span> Skype </span>
                </a> 
                <a href='mqq://im/chat?chat_type=wpa&uin=2819375167&version=1&src_type=web'>
                 <img src="../../assets/image/qq.png" alt="">
                    <span>QQ</span>
                </a>
                <a href="tel:010-4964-2655" > 
                    <i class="ion-ios-telephone" style="font-size:20px" :style="{color:$store.state.themestyle.theme.themeColor}"/>
                    <span >  {{$t('call')}} </span>
                </a>
            </div>
            <div class='emi'
                 v-show="inputType==='emi'">
                <emotion is-gif
                         v-for='item in emotionList'
                         @click.native='onEmi'>{{item}}</emotion>
            </div>
        
        </div>
    </div>
</template>
<script>
 
import { WechatEmotion as Emotion, XButton } from 'vux'
import { insertImage,saveSelection } from '../../util/range'
export default {
    name: 'help',
    data() {
        return {
            imageData:'',
            inputType: '',
            emotionList: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
            inputValue:'',
            height:''
        }
    },
 
    components: {
        Emotion,
        XButton,
    },
    watch:{
        mapShow(flag){
            if(flag&&this.map===null){
                
            }
        },
        chartList(){
             this.gotoEnd()
        }
    },
    created(){
        if(!this.customerService){
            console.log('请求客服')
            this.$socket.emit(1, { 
                 from: this.user.userId,
                 latitude:this.myPostion.lat,
                 longitude:this.myPostion.lng,
            })
        }
       
     this.updateHeight()
        window.addEventListener('resize', ()=>{
           this.updateHeight()
           this.$nextTick(()=>{
                this.gotoEnd()
             })
        })
        document.addEventListener("deviceready", (e) => {

         Keyboard.shrinkView(true);
        })
    },
    computed: {
        customerService(){
            return  this.$store.state.help.customerService
        },
        user(){
            return this.$store.state.user
        },
      chartList(){
          return this.$store.state.help.chartList
      },
       myPostion(){
           return this.$store.state.map.myPostion
       },
       map(){
           return this.$store.state.map.map
       }
    },
  
    mounted(){
        window.showMap=this.showMap
            this.gotoEnd()
             let divInput=document.getElementById('inputValue');
            divInput.addEventListener('click',()=>{
                saveSelection(divInput)
            })        
            if(this.map){
                this.map.addEventListener(plugin.google.maps.event.MAP_CLOSE,  ()=>{
                this.$store.commit('updateMapDialog',false)
                });
            }
    },
  
    activated(){
        this.$store.commit('restUnread',true)
         this.gotoEnd()
    },
    deactivated(){
        this.$store.commit('restUnread',false)
        this.inputType=''
    },
    methods: {
        updateHeight(){
              let out=47
                if (this.$store.state.platformId === 'ios') {
                out = 67
                } else {
                out = 47
            }
             this.height = (document.documentElement.clientHeight-out)+'px'
         
        },
        setInputType(type) {
            if (type === this.inputType) {
                this.inputType = ''
            } else {
                this.inputType = type
            }
        },
        onEmi(e){
            let divInput=document.getElementById('inputValue');
            insertImage(divInput,e.target.src)
            this.inputValue=divInput.innerHTML
            divInput.blur()
          
        },
        gotoEnd(){
             chart.scrollTop = chart.scrollHeight;
            this.$nextTick(()=> {
                chart.scrollTop = chart.scrollHeight;
             })
            //  if(chart.scrollHeight> document.documentElement.clientHeight){
            //      window.scrollTo(0,280)
            //  }
        },
        onInput(e){
            this.inputValue=e.target.innerHTML
            saveSelection(e.target)
        },
       sendMsg(){
             let data ={
               msgType:3,
               type:'client',
               from: this.user.userId,
               to:this.customerService?this.customerService.from:'',
               content:this.inputValue,
               language:localStorage.getItem('lang')
           }
        if(!this.customerService){
            console.log('请求客服')
            this.$socket.emit(1, { 
                 from: this.user.userId,
                 latitude:this.myPostion.lat,
                 longitude:this.myPostion.lng,
            })

        } else {
            this.$socket.emit(data)
        }
         
           
            
            this.$store.commit('SOCKET_3',data)
           this.inputValue='';
           document.getElementById('inputValue').innerHTML='';
           if(this.inputType==''){
              document.getElementById('inputValue').focus()
           }
             
       },
       showMap(){
            this.map.showDialog()
           this.map.setCenter(this.myPostion)
           this.$store.commit('updateMapDialog',true)
       },
       sendLocation(content){
           this.imageData=content
            let weizhi=this.$t("map.locationTitle")  
           let msg=` <p>${weizhi}</P><img  src="${content}" onClick="showMap()"  style="height:200px;width:150px ">`
            let data ={
               msgType:4,
               type:'client',
               from: this.user.userId,
               to:this.customerService?this.customerService.from:'',
               content:msg,
               language:window.localStorage.getItem('lang'),
               latitude:this.myPostion.lat,
               longitude:this.myPostion.lng,
               
           }
             this.$store.commit('SOCKET_3',data)
            if(this.customerService){
                 delete data.content
                this.$socket.emit(data)
           }
       },
       addLocation(){
           const self=this
           this.map.showDialog()
           this.map.setCenter(this.myPostion)
           this.$store.commit('updateMapDialog',true)
           setTimeout(()=>{
                self.map.toDataURL(function(imageData) {
                        self.sendLocation(imageData)
                });
           },300)
            this.inputType=''
       }
    }
}

</script>
<style lang="less">
#locationMap{
    width:100%;
    height:300px
}

.chart-conner {
    overflow:hidden;
    background: #fbf9fe;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
 
    .emi {
        background: #fff;
        border-top:1px solid #ddd;
        padding: 8px; 
        height: 150px;
        overflow-y: auto;
         -webkit-overflow-scrolling: touch;
    }
    .callcenter {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        background: #fff;
        border-top:1px solid #ddd;
        justify-content: space-around;
        div,a {
            height: 60px;
            line-height: 25px;
            width: 45%;
            color:#666666;
            border: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 13px;
            &:active {
                opacity: .3;
                background: #ddd;
            }
            img{
                height: 20px;
            }
        }
    }
    .chart {
        overflow-y: auto;
        // padding-bottom: 10px;
        // margin-bottom: 300px;
         -webkit-overflow-scrolling: touch;
         height:100%;
         .time{
             display: flex;
           align-items:center;
               justify-content: center;
               span{
                   border-radius: 20px;
                   margin-top: 8px;
                   padding: 2px 8px;
                   font-size: 14px;
                    background: rgba(0,0,0,0.4);
                    color: white;
               }
        }
    }
    .client {
        color: #ffffff;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        margin-top:10px;
        margin-right: 8px;
    }
    .server {
        color: #ffffff;
        margin-top:10px;
        margin-left: 8px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .titleicon {
        height: 40px;
        width: 40px;
        border-radius:50%;
        display: flex;
        overflow:hidden;
        align-items: center;
        justify-content: center;
        max-width: 30%;
        img {
            width: 100%
        }
    }
    .send {
        position: relative;
        min-height:20px;
        background: #18b9b3;
        border-radius: 9px;
		border-top-right-radius: 0;
        justify-content: flex-end;
        word-break: break-all;
        word-wrap: break-word;
        max-width: 70%;
        padding:3px;
        margin-top:7px;margin-right:5px;
        min-width: 40px;
    }
    .receive {
        padding: 5px 8px;
        position: relative;
        max-width: 70%;
        min-height:20px;
        background: #dbebec;
        border-radius: 9px;
		border-top-left-radius: 0;
        word-break: break-all;
        word-wrap: break-word;
        margin-top:7px;margin-left:5px;
        min-width: 40px;
        color:#666
    }
    .help-neirong{
    	padding:0 8px;
    }
    #bottomBar{
        position: absolute;
        width: 100%;
        bottom: 0
    }
    .shuru {
        background: #ffffff;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
     
        min-height: 45px;
        padding-right: 8px;
        border-top: 1px solid #ddd;
        .seachicon {
            margin-right: 12px;
            padding: 0;
            &:active {
                opacity: .3;
                background: #ddd;
            }
        }
        .btn{
            height: 35px;
            line-height: 34px;
            font-size: 14px;
            padding:0 12px ;
             margin-right: 12px;
        }
        #inputValue {
            flex: 1;
            border: 0;
            outline: none;
            min-height: 30px;
            font-size: 18px;
            margin-left: 15px;
            margin-bottom: 5px;
            // border-bottom: 1px solid #02A1AB
        }
    }
}
</style>