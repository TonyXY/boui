<template>
    <div id="app">
        <bo-table
            :columns="columns1"
            :data="data1"
            @on-select="select"
            @on-select-all="selectAll"
            @on-sort-change="change"
            height="200px"
        >
            <template slot="name" slot-scope="{ row, col }">
                <h3>{{ row[col.key] }}</h3>
            </template>
            <template slot="action">
                <bo-button>删除</bo-button>
            </template></bo-table
        >
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns1: [
                {
                    type: "selection",
                    width: 60
                },
                {
                    title: "Name",
                    key: "name",
                    slot: "name"
                },
                {
                    title: "Age",
                    key: "age",
                    sortable: "true", // iview  默认排序 排序方法 custom（远程排序）
                    sortType: "asc"
                },
                {
                    title: "Address",
                    key: "address"
                },
                {
                    title: "operator",
                    slot: "action",
                    key: "operator"
                }
            ],
            data1: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
                }
            ]
        };
    },
    methods: {
        change({ col, type }) {
            console.log(col, type);
        },
        select(selection, row) {
            // selection 表示选中的所有的  row 表示当前是哪一个
            console.log(selection, row);
        },
        selectAll(selection) {
            console.log(selection);
        }
    }
};
</script>
<style lang="scss">
html,
body,
#app {
    height: 100%;
}
.bo-main {
    background-color: #e9eef3;
    color: #333;
    line-height: 160px;
}
</style>
