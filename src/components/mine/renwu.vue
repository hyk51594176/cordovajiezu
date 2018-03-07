<template>
    <div class="home">
        <x-button style="width: 90%;margin-top:60px " @click.native="testAr('preview', 'A1', 3000, 37.3891696, 127.0875249)" :style='$store.state.themestyle.theme.button' >
            TEST PREVIEW
        </x-button>
            <img id="myImage" :src='img' style="width:100%">
        <x-button style="width: 90%;margin-top:60px " @click.native="testAr('ar', 'A1', 3000, 37.3891696, 127.0875249)" :style='$store.state.themestyle.theme.button' >
            TEST AR
        </x-button>
    </div>
</template>
<script>

import { XButton} from 'vux'
    export default {
        name: 'home',
        data(){
            return {
                img:''
            }
        },
       components: {
	        XButton
	  },
      mounted () {
      },
      methods: {
          testAr(isAr, spot, pTime, lat, lng){
            if(isAr == 'preview') {
              CameraPreview.stopCamera();
              CameraPreview.startCamera({isAr: false, location: spot, pauseTime: pTime, lat, lng},
                e=>{}, e=>{});
            } else if(isAr == 'ar') {
              CameraPreview.stopCamera();
              CameraPreview.startCamera({isAr: true, location: spot, pauseTime: pTime, lat, lng},
                e=>{}, e=>{});
            } else if(isAr == 'close') {
              CameraPreview.stopCamera();
            }
          }
      }

    }

</script>
<style lang="less">

</style>
