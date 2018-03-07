<template>
    <div class="home alarm"  @scroll="lazloadin">
      <div v-if="msgList.length==0"
             style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
        <div class="alarm-message vux-1px-b " v-for='obj in msgList'><!--or class name : alarm-status-after-->
           <strong><span class='ion-android-notifications shansuo'></span>{{obj.noticeTitle}}</strong>
           <span class="alarm-time">{{obj.noticeTime}}</span>
           <br/>

           <div v-html="obj.noticeDetail">
           </div>
        </div>
    </div>
</template>
<script>
 import {msgSystemNotice} from 'api/api'
    export default {
        data(){
            return{
                msgList:[],
                page:{
                    start:0,
                    length:15,
                    userId:this.$store.state.user.userId
                },
                recordsTotal:0
            }
        },
        created(){
            this.$store.commit('restNotice')
            this.init()
        },
        methods:{
            init(){
                msgSystemNotice(this.page).then(res=>{
                    let arr=res.data.obj.data||[]
                    this.msgList=[...this.msgList,...arr];
                    this.recordsTotal=res.data.recordsTotal
                })
            },
              lazloadin(e){
                if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20) {
                        if(this.$store.state.isLoading)return
                        if (this.msgList.length < this.recordsTotal) {
                            this.page.start = this.msgList.length;
                            this.init()
                        }
                    }
            },
        }
    }
</script>

<style lang="less">
.alarm{
  overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
    .alarm-message{
        background: #ffffff;
        border-left:5px solid #02a1ab;
        padding:8px 12px;
        line-height:1.2;
        strong{
        	display:block;
            font-size:18px;
            color:#164c82;
            span{
            	margin-right:5px;
            	 
            	color:#02a1ab; 
            }
        }
         span.alarm-time{
         	position:absolute;
         	margin-top:-18px;right:12px;
            font-size:13px;
            color:#02a1ab;    
        }
    }
    .alarm-message.alarm-status-after{
    	background:#f1f1f1;
    	border-color:#ccc;
    	strong{
    		color:#666;
    		span{
    			animation:none;
    			color:#666
    		}
    	}
    	span.alarm-time{
    		color:#999
    	}
    }
    
</style>