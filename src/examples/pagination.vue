<template>
    <div id="app">
        <bo-pagination :total="10" :pager-count="7" :current-page.sync="currentPage"></bo-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentPage: 6,
        };
    },
    methods: {
    }
};
</script>
<style lang="scss">
html,body,#app{
  height: 100%;
}
.bo-main {
    background-color: #e9eef3;
    color: #333;
    line-height: 160px;
}
</style>
