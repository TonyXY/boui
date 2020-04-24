<template>
    <div id="app">
        <div>
            <bo-carousel :height="height">
                <bo-carousel-item style="background:red;">
                    <div >one</div>
                </bo-carousel-item>
                <bo-carousel-item style="background:green;">
                    <div >two</div>
                </bo-carousel-item>
                <bo-carousel-item style="background:orange;">
                    <div>three</div>
                </bo-carousel-item>
            </bo-carousel>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            height: "300px"
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
