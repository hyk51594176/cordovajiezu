<template>
    <div class="home">
    <group>
      <cell :title="'game'+i"  isLink v-for='i in 5'></cell>
    </group>
    </div>
</template>
<script>
    import {
        Cell,
        Group
    } from 'vux'
    export default {
        components: {
            Cell,
            Group
        },
        data() {
            return {

            }
        },

    }
</script>
<style lang="less">

</style>