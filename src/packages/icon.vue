<template>
    <svg class="bo-icon" aria-hidden="true" @click="$emit('click')">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script>
import '@/styles/icon'
export default {
    name:'bo-icon',
    props:{
        icon:{
            type:String,
            required:true
        }
    }
}
</script>

<style lang="scss">
.bo-icon{
    width: 25px;
    height:25px;
    vertical-align: middle;
}
</style>