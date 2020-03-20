<template>
  <div id="app">
    <!-- 默认按钮 -->
    <bo-button>默认按钮</bo-button><br>
    <!-- 带类型的按钮 -->
    <bo-button type="primary">主要按钮</bo-button>
    <bo-button type="warning">警告按钮</bo-button>
    <bo-button type="danger">危险按钮</bo-button>
    <bo-button type="success">成功按钮</bo-button>
    <bo-button type="info">信息按钮</bo-button>
    <!-- 带icon的按钮 -->
    <bo-button type="info" icon="sousuo">信息按钮</bo-button>
    <bo-button type="primary" icon="eye"></bo-button>
    <bo-button type="success" icon="eye" icon-position="right">内容</bo-button>
    <br>
    <!-- loading按钮 -->
    <bo-button type="success" loading>加载中</bo-button>
    <br>
    <!-- 触发事件 -->
    <bo-button type="success" @click="fn">触发事件</bo-button>
    <br>
    <bo-button-group>
      <bo-button type="primary" icon="left">上一页</bo-button>
      <bo-button type="primary" icon="right" icon-position="right">下一页</bo-button>
    </bo-button-group>
    <br>
    <bo-icon icon="sousuo"></bo-icon>
    <bo-icon icon="edit"></bo-icon>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods:{
    fn(e){
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
</style>
