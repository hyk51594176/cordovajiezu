<template>
    <div class="bootPage">
    <!--<swiper :height="height"    :show-dots="true">
      <swiper-item v-for='(obj,index) in piclist' style="text-align:center">
          <img :src="obj.pictureUrl"  style="height:100%;width:100%">
          <div class='nextbtn'>
             <x-button 
             mini
             v-if='index==piclist.length-1' 
             @click.native="goto" class='tiyan' 
             :style="$store.state.themestyle.theme.button">{{$t('bootpage.btn')}}</x-button>
          </div>
      </swiper-item>-->
       <img :src="img" style="width:100%" @click='imgClick'>
    </swiper>
    </div>
</template>
<script>
    import bootPage from 'api/bootPage';
    let timer = null;

    // import {appGuidPage} from 'api/api';
    // import {Swiper, SwiperItem,XButton} from 'vux';
    export default {
        data() {
            return {
                // piclist:[],
                index: 1,
                goOn: false
                    // height:document.documentElement.clientHeight+'px',
            }
        },

        created() {
            // appGuidPage().then(res=>{
            //     this.piclist = res.data.obj
            // })

        },
        // components: {
        //     Swiper, SwiperItem,XButton
        // },
        computed: {
            img() {
                let key = 'bootPage' + this.index
                return bootPage[key]
            }
        },

        mounted() {

            document.addEventListener("deviceready", (e) => {
                navigator.splashscreen.hide();
            })
            this.getImg()
        },
        methods: {
            goto() {
                window.localStorage.setItem('firstStart', true)
                this.$router.replace({
                    name: 'bigMap'
                })
            },
            getImg() {
                if (this.index == 19) {
                    clearTimeout(timer)
                    timer = null
                    this.goto()
                    return
                }

                if (this.index == 12 && !this.goOn) {
                    this.index = 8
                } else {
                    this.index += 1;
                }
                timer = setTimeout(this.getImg, 300)
            },
            imgClick() {

                if (this.index > 7 && this.index < 13) {
                    this.goOn = true
                } else if (this.index == 19) {
                    this.goto()
                }
            }
        }

    }
</script>
<style lang="less">
    .nextbtn {
        position: absolute;
        bottom: 100px;
        width: 100%;
        display: flex;
        justify-content: center;
        .tiyan {
            padding: 2px 20px
        }
    }
</style>