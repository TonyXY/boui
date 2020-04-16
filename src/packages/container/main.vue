<template>
    <main class="bo-main">
        <slot></slot>
    </main>
</template>
<script>
export default {
    name:'bo-main'
}
</script>
<style lang="scss">
.bo-main{
    flex:1;
    padding:20px;
}
</style>