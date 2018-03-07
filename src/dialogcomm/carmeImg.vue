<template>
    <div class="home story">
       
        <grid  >
            <grid-item :label="obj.articleTitle" v-for="obj in List" @click.native="goto(obj)">
                <img slot="icon" :src="getImg(obj)">
            </grid-item>
        </grid>
    </div>
</template>
<script>
import { Grid, GridItem } from 'vux'
 
    export default {
      props:{
          completedMisston:{
              type:Array

          }
      },
      data(){
          return {
              List:[]
          }
      },
        created(){
            this.List=[...this.completedMisston,{areaCode:'default'}]
        },
        components: {
             Grid, GridItem 
        },
        methods: {
            getImg(obj){
                if(obj.areaCode==='default'){
                    return  require('../assets/mapareaImg/jejustory-thumb-default.png')
                }else{
                  let index = obj.areaCode.replace(/[^0-9]+/g, '')
                   if(index>10) return
                    return  require(`../assets/mapareaImg/jejustory-thumb-${obj.areaCode.toUpperCase()}.png`)
                }
            },
            goto(obj){
                this.$emit('showCarme',obj)
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
        	margin:auto;
            padding:10px 0;
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