<template>
    <div class="bo-button-group">
        <slot></slot>
    </div>
</template>
<script>
export default{
    name:"bo-button-group",
}
</script>
<style lang="scss">
@import "../styles/_var.scss";
.bo-button-group{
    display:inline-flex;
    vertical-align: middle;
    button{
        position: relative;
        border-radius: 0;
        &:not(first-child){
            margin-left:-1px;
        }
        &:first-child{
            border-radius: $border-radius 0 0 $border-radius;
        }
        &:last-child{
            border-radius: 0 $border-radius $border-radius 0;
        }
        &:hover{
            z-index:1
        }
        &:focus{
            z-index: 2;
        }
    }
}
</style>