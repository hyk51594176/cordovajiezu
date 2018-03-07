<template>
    <div class="seletheme">
        <span  @click="setPayType('apay')">
        </span>
          <span  @click="setPayType('wpay')">
        </span>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations([
            'setPayType'
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