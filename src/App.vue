<template>
    <div id="app">
        {{ value }}
        <div style="margin:200px 0 0 300px">
            <bo-popover
                v-model="value"
                width="400px"
                title="标题"
                content="内容，这是一个popover"
                trigger="hover"
                placement="right"
            >
                <bo-button type="primary" slot="reference">点我弹框</bo-button>
            </bo-popover>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: false
        };
    },
    methods: {
        load() {
            this.count += 2;
        }
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
