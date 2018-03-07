<template>
    <svg :id="'id'+text" style="width:100%">

    </svg>
</template>
<script>
let JsBarcode = require('jsbarcode');
export default {
    props:{
        option:{
            type:Object,
        },
        text:{
             type: [String,Number],
            required: true
        }
    },
    mounted(){
        JsBarcode("#id"+this.text, this.text,this.option);
    }
}
</script>
<style>

</style>