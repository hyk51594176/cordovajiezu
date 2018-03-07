<template>
    <div class="home storyRelated"  @scroll="lazloadin">
        <div v-if="!storyData"
             style="width:100%;text-align:center;padding-top:18px">
            {{$t('nodata')}}
        </div>
        <div v-if="storyData">
            <div class="related-title">
                <div>
                    <h4 > {{storyData.articleTitle}} </h4> {{storyData.modifyTime||storyData.articlePubTime}}
                </div>
                <div style="position:relative " v-if='$route.query.showCommen'>
                    <img src="../../assets/image/message.png">
                    <span class="badge">{{recordsTotal}} </span>
                </div>
            </div>
            
            <div class="storyRelated-neirong"
                 v-html="storyData.articleDescription">
                  
            </div>
            
            <div class="storyRelated-comment vux-1px-t" v-if='$route.query.showCommen' >
                <div v-if="commentList.length>0">
                        <h4>
                            {{recordsTotal}} {{$t('story.comment')}}	
                        </h4>
                        <div v-for="obj in commentList" :key='obj.commentId' class="commentcontent vux-1px-b">
                            <div class="tourist">
                             
                                <img :src="obj.avatar||''" @error="$event.target.src=require('../../assets/image/logo192.png')"/>
                               <div>

                                <span>{{obj.nikeName||$t("tourist")}}</span>
                                <p>  {{ obj.createTime}}</p>
                               </div>
                            </div>
                            <span>
                                {{obj.commentContent}}
                            </span>
                        </div>
                    
                </div>
                <div v-if="commentList.length==0"
                    style="width:100%;text-align:center;padding-top:18px">
                    {{$t('noCommentdata')}}
                </div>
            </div>
            <div class="vux-1px-t"
            v-if='$route.query.showCommen'
                 style="position:fixed;width:100%;bottom:0px;background:#ffffff">
                <x-input :placeholder="$t('storyRelated.addComment')"
                type='text'
                         v-model="comment"  @keyup.native.enter="submit"/>
                          
            </div>
        </div>
    </div>
</template>
<script>
import {
     articleDetail,
    articleCommentPages,
    articleCommentAdd
} from 'api/api';
import { XInput } from 'vux';
export default {
    data() {
        return {
            comment: '',
            storyData: null,
            commentList:[],
            recordsTotal:0,
            page:{
                start:0,
                length:10,
                articleId:0
            }
        }
    },
    created() {
       this.init()
    },

    methods: {
        init(){
             articleDetail({articleId:this.$route.query.articleId}).then(res=>{
                this.storyData = res.data.obj
                this.page.articleId=res.data.obj.articleId
                this.$route.query.showCommen&&this.getCommenlist()
            })
        },
      getCommenlist(flag){
            articleCommentPages(this.page,false).then(res=>{
                if(flag){
                    this.commentList=res.data.obj.data
                }else{
                    this.commentList=[...this.commentList,...res.data.obj.data];
                }
                 this.recordsTotal = res.data.obj.recordsTotal
            })
      },
      lazloadin(e){
          if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20) {
                if(this.$store.state.isLoading)return
                if (this.commentList.length < this.recordsTotal) {
                    this.page.start = this.commentList.length;
                    this.getCommenlist()
                }
            }
      },
      submit(){
         let data = {
                articleId:this.storyData.articleId,
                commentContent:this.comment,
                userId:this.$store.state.user.userId
          }
           articleCommentAdd(data).then(res=>{
                this.storyData.agreeCount+=1
                this.comment=''
               this.page.start = 0
                 this.getCommenlist(true)
                 if(window.Keyboard){
                     Keyboard.hide();
                 }
           })
      }
    },
    components: {
        XInput
    },
    computed: {
        marker() {
            return this.$store.state.map.marker
        },
    }
}
</script>
<style lang="less">
.storyRelated {
    background: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    
    .related-title {
        padding: 8px 8px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h4{
            font-size: 25px
        }
    }
    .storyRelated-neirong {
        padding: 8px;
    }
    .storyRelated-comment{
        margin-bottom: 60px;
        padding: 8px;
        .tourist{
             display:flex;
            align-items: center;
            img{
                height:40px;
               margin-right:5px;
            }
            p{
                padding:0;
                font-size:15px;
                color:gray
            }
        }
    }
    .badge {
        text-align: center;
        background: #f74c31;
        color: #fff;
        font-size: 12px;
        min-height: 21px;
        min-width: 21px;
        border-radius: 50%;
        padding: 1px;
        position: absolute;
        bottom: 9px;
        right: 0px;
    }
    .commentcontent{

    }
}
</style>