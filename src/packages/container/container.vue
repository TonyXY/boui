<template>
    <section class="bo-container" :class="{isVertical}">
        <slot></slot>
    </section>
</template>
<script>
export default {
    name:'bo-container',
    data(){
        return {isVertical:true}
    },
    mounted(){
        this.isVertical = this.$children.some(child=>{
            return ["bo-header","bo-footer"].includes(child.$options.name)
        })
    }
}
</script>
<style lang="scss">
.bo-container{
    display:flex;
    flex-direction: row;
    flex: 1;
    &.isVertical{
        flex-direction: column;
    }
}
</style>