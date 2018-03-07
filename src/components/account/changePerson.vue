<template>
    <div class="home changeperson">
    <div class="changeperson-con vux-1px-tb">
      
        <radio :options="radios" v-model='value' v-if="key==='gender'" /> 
        <div @click='show=true'  v-else-if="key==='photoUrlFile'" class="imgfile" >
            <img :src="value||''" @error='$event.target.src=require("../../assets/image/logo192.png")'  >
        </div>
       
        <div  v-else-if="key==='userCode'" class="usercode">
            <barcode :text="value"   style="width:90%"
                :option="{  width:2,
                            background:'transparent',
                            textAlign:'center'}"/> 
            <vueqrious :value='value' :size='200'  /> 
            {{$store.state.currentWebVersion}}
        </div>
        <x-input :title="$t($route.meta.title)"
                  v-model="value"
                 placeholder-align="right"  v-else />
    </div>
    	<x-button  
        class="changeperson-btn"
        @click.native="updatePerson"
        v-if="key!=='userCode'"
        :style='$store.state.themestyle.theme.button'>{{$t('changeperson.btn')}}</x-button>
       
      <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu="actionClick"></actionsheet>
    </div>
</template>
<script>
import {XInput,XButton,Radio,Actionsheet} from 'vux';
import {userInfoUpdate,USERINFO_AVATAR} from 'api/api';
import {
    USERINFO_USERLOGIN
} from 'types';
 import vueqrious  from '../../plugin/vue-qriously';
 import barcode from '../../plugin/barcode';

export default {
    data () {
        return {
            value:this.$route.query.value,
            key:this.$route.query.key,
            show:false,
            file:'',
            radios:[
              
                {
                    value:this.$t('changeperson.boy'),
                    key:1
                },
                {
                    value:this.$t('changeperson.girl'),
                    key:2
                }
            ],
            menus:[{
                label: this.$t('changeperson.carme'),
                type: 'primary',
                value: 1
            },{
                label:this.$t('changeperson.file'),
                type: 'Primary',
                value: 2
            }]
        }
    },
    created(){
      if(this.$route.query.key==='userCode'){
          this.$socket.emit(20, { 
                 from: this.$store.state.user.userId,
            })
      }
    },
    methods: {
      updatePerson(){
          if(!this.value)return
          if(this.key==='photoUrlFile'){
            this.uploadImg()
          }else{
              this.update()
          }
      },
      uploadImg(){
            //此处执行文件上传的操作，上传成功后执行下面代码
            let options = new FileUploadOptions(); //文件参数选项
            options.fileKey = "avatarimg";//向服务端传递的file参数的parameter name
            options.fileName = this.value.substr(this.value.lastIndexOf('/') + 1);//文件名
            
            options.params = {
                userId:this.$store.state.user.userId
            }
            let headers = {
                ['accept-language']:localStorage.lang 
            }
            options.headers=headers
            options.mimeType = "image/jpeg";//文件格式，默认为image/jpeg
            let ft = new FileTransfer();//文件上传类
             this.$store.commit('updateLoadingStatus', true)
          console.log(this.value)
            ft.upload(this.value, encodeURI(USERINFO_AVATAR), 
            (e)=>{
                this.$store.commit('updateLoadingStatus', false)
                let data = JSON.parse(e.response)
                if(data.result){
                    this.$router.back()
                }
                this.$vux.toast.show({
                    text: data.description,
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })
            }, (e)=>{
          console.log(e)
                
                this.$store.commit('updateLoadingStatus', false)
                this.$vux.toast.show({
                    text: e.exception,
                    position: 'bottom',
                    type: 'text',
                    width: 'auto'
                })
            }, options);
      },
      update(){
          let data={
              userId:this.$store.state.user.userId,
              [this.key]:this.value
          }
       
        userInfoUpdate(data).then(res=>{
            this.$store.commit(USERINFO_USERLOGIN,res.data.obj)
            this.$router.back()
        })
      },
     
      actionClick(e){
        if(e===1){
            this.cameraTakePicture(1)
        }else if(e===2){
            this.cameraTakePicture(2)
        } 
      },
       cameraTakePicture(index){
            navigator.camera.getPicture(imageData=>{
                 console.log(imageData)
                this.value = imageData.split('?')[0];
            }, message=>{
            }, { 
                quality: 50,
                mediaType:0,
                targetHeight:800,
                // targetWidth:800,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: index ,
                encodingType:0 
            });
        }  
    },
    components: {
        XInput,
        XButton,
        Radio,
        Actionsheet,
        vueqrious,
        barcode
    }
}
</script>
<style lang="less">
.changeperson-con{
    margin-top: 8px;
    background: #ffffff;
    .usercode{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding:50px 0; 
    }
    .imgfile{
        padding: 8px;
        &:after{
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            position: relative;
            top: -2px;
            position: absolute;
            top: 50%;
            margin-top: -4px;
            right: 22px;
        }
        img{
            display:block;
            width:45px;
            height:45px;
            border:2px solid #fff;
            border-radius:50%;
            box-shadow:0px 2px 2px 0px rgba(50, 50, 50, 0.2)  
        }
    }
}
    .changeperson-btn{
        margin-top: 150px;
        width: 88% !important;
    }
</style> 