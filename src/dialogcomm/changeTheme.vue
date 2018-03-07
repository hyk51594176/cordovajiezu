<template>
    <div class="seletheme">
        <span v-for="(obj,key) in themeObj"
              :style="{background:obj.themeColor}"
              @click="changeTheme(key)">
              </span>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    computed: {
        themeObj(){
            return this.$store.state.themestyle.themeObj
        }
    },
    methods: {
        ...mapMutations([
            'changeTheme'
        ]),
    }
}
</script>
<style lang="less">
.seletheme {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px 0;
    span {
        height: 80px;
        width: 60px;
        &:hover {
            border: 2px solid #F1F141
        }
        //    border: 1px solid #ddd
    }
}
</style>