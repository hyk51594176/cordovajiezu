<template>
    <div class="home story">
         <div v-if="storyList.length==0"
             style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
        <grid  >
            <grid-item :label="obj.articleTitle" v-for="obj in storyList" @click.native="goto(obj)">
                <img slot="icon" :src="getImg(obj)">
            </grid-item>
        </grid>
    </div>
</template>
<script>
import { Grid, GridItem } from 'vux'
  import {
     appGetStory
 }from 'api/api'
    export default {
        data(){
            return {
                 storyList:[]
            }
        },
        created(){
            appGetStory().then(res=>{
                this.storyList = res.data.obj.sort((a,b)=>{
                    let int1 = this.getInt(a.areaCode)
                    let int2 =  this.getInt(b.areaCode)
                    
                    return int1-int2
                })
            })
        },
        components: {
             Grid, GridItem 
        },
       
        methods: {
          getInt(areaCode){
             let index = areaCode.replace(/[^0-9]+/g, '')
             if(areaCode.toUpperCase().indexOf('B')==0)index+=10
             return index
          },
            getImg(obj){
               
                let index = obj.areaCode.replace(/[^0-9]+/g, '')
                   if(index>10) return
                    return  require(`../../assets/mapareaImg/jejustory-thumb-${obj.areaCode.toUpperCase()}.png`)
            },
            goto(obj){
                this.$router.push({path:'/storyRelated',query:{title:obj.articleTitle,articleId:obj.articleId}} )
            },
            
        }
    }
</script>
<style lang="less">
    .story{
        overflow-y: auto;
        background: #ffffff;
        -webkit-overflow-scrolling: touch;
        .weui-grid{
        	display:block;
        	margin:10px 0 0 0;padding:0;
        	width:20%;
        }
        .weui-grid__icon{
        	width:initial;height:initial;
        }
        .weui-grid__label{
        	position:relative;
        	margin-top:-25px !important;
        	background-color:rgba(2,161,171,.8);
        	color:#fff;
        	font-size:16px;
        	text-transform:uppercase;
        }
        .weui-grid:before,.weui-grid:after{
        	border:none;
        }
    }
</style>