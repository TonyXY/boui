<template>
    <ul class="bo-pagination">
        <li @click="select(currentPage - 1)">
            <bo-icon icon="left"></bo-icon>
        </li>
        <li @click="select(1)">
            <span :class="{ active: currentPage === 1 }">1</span>
        </li>
        <li v-if="showPrevMore">
            <span>...</span>
        </li>
        <li v-for="p in pagers" :key="p" @click="select(p)">
            <span :class="{ active: currentPage === p }">{{ p }}</span>
        </li>
        <li v-if="showNextMore">
            <span>...</span>
        </li>
        <li @click="select(total)">
            <span :class="{ active: currentPage === total }">{{ total }}</span>
        </li>
        <li @click="select(currentPage + 1)">
            <bo-icon icon="right"></bo-icon>
        </li>
    </ul>
</template>
<script>
export default {
    name: "bo-pagination",
    props: {
        total: {
            type: Number,
            default: 1
        },
        pagerCount: {
            type: Number,
            default: 7
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            showPrevMore: false,
            showNextMore: false
        };
    },
    computed: {
        pagers() {
            let total = this.total;
            let pagerCount = this.pagerCount;
            let middleValue = Math.floor(pagerCount / 2);
            let currentPage = this.currentPage;
            let showPrevMore = false;
            let showNextMore = false;
            if (total > pagerCount) {
                if (currentPage > middleValue + 1) {
                    showPrevMore = true;
                }
                if (currentPage < total - middleValue) {
                    showNextMore = true;
                }
            }
            // 如果前面 有...  当前页为5的时候  1  ... 3  4  5  6 7  ...    10
            let arr = [];
            if (showPrevMore && !showNextMore) {
                let start = total - (pagerCount - 2);
                for (let i = start; i < total; i++) {
                    arr.push(i);
                }
            } else if (!showPrevMore && showNextMore) {
                for (let i = 2; i < pagerCount; i++) {
                    arr.push(i);
                }
            } else if (showPrevMore && showNextMore) {
                let val = Math.floor((pagerCount - 2) / 2);
                for (let i = currentPage - val; i <= currentPage + val; i++) {
                    arr.push(i);
                }
            } else {
                for (let i = 2; i < total; i++) {
                    arr.push(i);
                }
            }
            this.showPrevMore = showPrevMore;
            this.showNextMore = showNextMore;
            return arr;
        }
    },
    methods: {
        select(current) {
            if (current < 1) {
                current = 1;
            }
            if (current > this.total) {
                current = this.total;
            }
            if (current !== this.currentPage) {
                this.$emit("update:current-page", current);
            }
        }
    }
};
</script>
<style lang="scss">
@import "@/styles/_var.scss";
.bo-pagination li {
    list-style: none;
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    user-select: none;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 2px;
    border: 1px solid $primary;
    cursor: pointer;
    .active {
        color: red;
    }
}
</style>
