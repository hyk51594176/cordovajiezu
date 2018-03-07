<template>
    <div class="home story"  @scroll="lazloadin">
          <div v-if="list.length==0"
             style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
       <div v-for="obj in list" class="vux-1px-b article" @click='goto(obj)'  >
           <div>
                <strong>
                    {{obj.articleTitle}} 
                </strong>
                <span style="float:right;margin-right:12px;">
{{obj.areaCode}}
                </span>
           </div>
            <p>{{obj.modifyTime||obj.createTime}}</p>
            <div v-html="obj.articleDescription" >
               
            </div>
       </div>
    </div>
</template>
<script>
import { Grid, GridItem } from 'vux'
import {
     appGetCartoon
 }from 'api/api'

    export default {
        data(){
            return {
              page:{
                  start:0,
                  length:10
              },
              list:[]  
            }
        },
        components: {
             Grid, GridItem 
        },
       created(){
           if(this.$route.query.isQuery){
               this.page.areaId=this.$store.state.map.marker.areaId
           }
            this.init()
       },
        methods: {
            init(){
                appGetCartoon(this.page).then(res=>{
                    this.list=[...this.list,...res.data.obj.data]
                    this.recordsTotal=res.data.obj.recordsTotal
                })
            },
            goto(obj){
               this.$router.push({path:'/storyRelated',query:{title:obj.articleTitle,articleId:obj.articleId,showCommen:true}} )
            },
             lazloadin(e) {
                if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20) {
                    if(this.$store.state.isLoading||this.$route.query.isQuery) return
                    if (this.list.length < this.recordsTotal) {
                        this.page.start = this.list.length;
                        this.init()
                    }
                }
            },
        }
    }
</script>
<style lang="less">
    .story{
        overflow-y: auto;
        background: #ffffff;
        -webkit-overflow-scrolling: touch;
      
       .article{
             padding: 8px;
             overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
       }
    }
</style>