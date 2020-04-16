<template>
    <aside class="bo-aside" :style="{width}">
        <slot></slot>
    </aside>
</template>
<script>
export default {
    name:'bo-aside',
    props:{
        width:{
            type:String,
            default:'300px'
        }
    }
}
</script>