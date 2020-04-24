<template>
    <transition>
        <div class="bo-carousel-item" v-if="isShow" :class="{ reverse }">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
export default {
    name: "bo-carousel-item",
    data() {
        let children = this.$parent.$children.filter((child) => child.$options.name === "bo-carousel-item");
        return {
            index: children.length - 1,
            reverse: false
        };
    },
    computed: {
        isShow() {
            return this.$parent.currentSelected === this.index;
        }
    }
};
</script>
<style lang="scss">
.bo-carousel-item {
    width: 100%;
    height: 100%;
}
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease-in-out;
}
.v-leave-to {
    transform: translateX(-100%);
    &.reverse {
        transform: translateX(100%);
    }
}
.v-enter {
    transform: translateX(100%);
    &.reverse {
        transform: translateX(-100%);
    }
}
.v-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
</style>
