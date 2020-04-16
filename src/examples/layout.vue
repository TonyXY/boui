<template>
  <div id="app">
    <bo-row>
      <bo-col :span=8><div class="bg-primary">aaaa</div></bo-col>
      <bo-col :span=8><div class="bg-warning">bbbb</div></bo-col>
      <bo-col :span=8><div class="bg-danger">cccc</div></bo-col>
    </bo-row>
    <br>
    <!-- 测试justify -->
    <bo-row justify="end">
      <bo-col :span=12><div class="bg-primary">aaaa</div></bo-col>
      <bo-col :span=2><div class="bg-warning">bbbb</div></bo-col>
    </bo-row>
    <br>
    <!-- 测试offset -->
    <bo-row>
      <bo-col :span=12><div class="bg-primary">aaaa</div></bo-col>
      <bo-col :span=2 :offset=10><div class="bg-warning">bbbb</div></bo-col>
    </bo-row>
    <br>
    <!-- 测试gutter -->
    <bo-row :gutter=20>
      <bo-col :span=6><div class="bg-primary">aaaa</div></bo-col>
      <bo-col :span=6><div class="bg-primary">bbbb</div></bo-col>
      <bo-col :span=6><div class="bg-primary">cccc</div></bo-col>
      <bo-col :span=6><div class="bg-primary">dddd</div></bo-col>
    </bo-row>
    <br>
    <!-- 测试响应式 -->
    <bo-row :gutter=10>
      <bo-col :span=6 :md=8 :lg=3><div class="bg-primary">aaaa</div></bo-col>
      <bo-col :span=6 :sm={span:2,offset:4} :md=4 :lg=5><div class="bg-primary">bbbb</div></bo-col>
      <bo-col :span=6 :md=4 :lg=12><div class="bg-primary">cccc</div></bo-col>
      <bo-col :span=6 :md=8 :lg=4><div class="bg-primary">dddd</div></bo-col>
    </bo-row>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods:{
  }
}
</script>

<style lang="scss">
@import "@/styles/_var.scss";
#app{
  overflow: hidden;
}
.bg-info{
  background: $info
}
.bg-warning{
  background: $warning
}
.bg-success{
  background: $success
}
.bg-primary{
  background: $primary
}
.bg-danger{
  background: $danger
}
</style>
