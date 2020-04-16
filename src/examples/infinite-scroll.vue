<template>
    <div id="app">
        <div class="infinitescroll-box">
            <ul
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
                infinite-scroll-delay="delay"
                infinite-scroll-distance="distance"
                infinite-scroll-immediate="immediate"
            >
                <li v-for="c in count" :key="c">{{ c }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 0,
            disabled: false,
            delay: 50,
            distance: 30,
            immediate: true
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
.bo-main {
    background-color: #e9eef3;
    color: #333;
    line-height: 160px;
}
.infinitescroll-box {
    border: 1px solid #f00;
    height: 300px;
    width: 300px;
    overflow: auto;
    ul li{
        height:30px;
        border-bottom:1px solid #000;
    }
}
</style>
