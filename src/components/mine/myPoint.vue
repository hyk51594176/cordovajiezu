<template>
    <div class="home mypoint" >
        <div class="myPoint-title">
                <h3>{{$store.state.user.point||0}}</h3>
        </div>
        <div class="vux-1px-t" style="height:44px">
            <tab :line-width="1" custom-bar-width="60px">
                <tab-item :selected='index===1' @click.native='index=1'>{{$t('myPoint.history')}}</tab-item>
                <tab-item :selected='index===2' @click.native='index=2'>{{$t('myPoint.used')}}</tab-item>
            </tab>
        </div>
        <div class="mypoint-container"  @scroll="lazloadin">
            <div v-show="index==1">
                 <div  v-for='obj in PiontGet' class="mypoint-neirong vux-1px-b">
                    <span> {{obj.busInfoName}}   </span>
                    <span class="time">  {{obj.createTime.substring(0,16)}} </span>  
                    <span>{{obj.points}} <span style='color:red'>{{obj.isBack?$t('myPoint.back'):''}}</span>    </span>
                </div>
                <div v-if="PiontGet.length==0"
                    style="width:100%;text-align:center;padding-top:18px">
                    {{$t('nodata')}}
                </div>
            </div>
            <div v-show="index==2">
                <div  v-for='obj in PiontUserd'  class="mypoint-neirong vux-1px-b">
                    <span> {{obj.busInfoName}}  </span>  
                    <span class="time">  {{obj.createTime.substring(0,16)}} </span>  
                    <span> {{obj.points}} <span style='color:red'>{{obj.isBack?$t('myPoint.back'):''}}</span>    </span>
                </div>
                <div v-if="PiontUserd.length==0"
                    style="width:100%;text-align:center;padding-top:18px">
                    {{$t('nodata')}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Tab, TabItem } from 'vux'
import {
    userPiontGet,
userPiontUsed
} from 'api/api';
    export default {
        data () {
            return {
                index:1,
                PiontGet:[],
                PiontUserd:[],
                PiontGetTotal:0,
                PiontUserdTotal:0,
                get:{
                    start:0,
                    length:15,
                    userId:this.$store.state.user.userId,
                },
                used:{
                    start:0,
                    length:15,
                    userId:this.$store.state.user.userId
                }
            }
        },
        created () {
           this.getPoint()
           this.getUsed()
            
        },
        methods: {
            
            getPoint(){
                userPiontGet(this.get).then(res=>{
                        this.PiontGet = [...this.PiontGet, ...res.data.obj.data]
                        this.PiontGetTotal = res.data.obj.recordsTotal
                })
            },
            getUsed(){
                userPiontUsed(this.used).then(res=>{
                    this.PiontUserd = [...this.PiontUserd, ...res.data.obj.data]
                    this.PiontUserdTotal = res.data.obj.recordsTotal
                })
            },
            lazloadin(e){
               
                if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20) {
                    if(this.$store.state.isLoading) return
                    if(this.index===1){
                        if (this.PiontGet.length < this.PiontGetTotal) {
                            this.get.start = this.PiontGet.length;
                            this.getPoint()
                        }
                    }else if(this.index===2){
                        if (this.PiontUserd.length < this.PiontUserdTotal) {
                            this.used.start = this.PiontUserd.length;
                            this.getUsed()
                        }
                    }
                }
            }
        },
        components: {
            Tab, TabItem
        }
    }
</script>
<style lang="less">
.mypoint{
    display: flex;
    flex-direction: column;
     .myPoint-title{
     	background-color:#f2f2f2;
        display: flex;
        width: 100%;
        padding:10px 0;
        flex-shrink:0;
        justify-content: center;
        align-items: center;
        h3::before{
        	content:'';
        	display:block;
        	float:left;
        	margin-right:7px;
        	background:url('../../assets/image/icon-mtabar.png') 50% -652px no-repeat #fff;
        	background-size:85%;
        	width:45px;height:45px;
        	border-radius:25px;
        }
        h3{
        	color:#335273;
        	font-size:30px;
        }
    }
     .vux-tab .vux-tab-item.vux-tab-selected {
            color: #02A1AB;
            font-weight:bold;
            border-bottom: 3px solid #02A1AB;
        }
        .vux-tab-bar-inner {
            background-color: #02A1AB;
        }
    .mypoint-container{
        overflow-y:auto;
        -webkit-overflow-scrolling: touch; 
        
        .mypoint-neirong{
            display: flex;
            justify-content: space-around;
            width: 100%;
            min-height: 50px;
            background: #ffffff;
            align-items: center;   
            .time{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }         
        }
    }
}
   
</style>