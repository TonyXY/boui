<template>
  <div id="app">
    <bo-input
      type="text"
      name="username"
      maxlength="10"
      placeholder="请输入用户名"
      v-model="data.username"
    ></bo-input>
    <br>
    <bo-input
      type="password"
      name="password"
      placeholder="请输入密码"
      v-model="data.password"
    ></bo-input>
    {{data}}
    <br>
    <!-- disabled -->
    <bo-input
      type="text"
      name="username"
      placeholder="请输入用户名"
      v-model="data.username"
      disabled
    ></bo-input>
    <br>
    <!-- readonly -->
    <bo-input
      type="text"
      name="username"
      placeholder="请输入用户名"
      v-model="data.username"
      readonly
    ></bo-input>
    <br>
    <!-- 清除功能 -->
    <bo-input
      type="text"
      name="username"
      placeholder="请输入用户名"
      v-model="data.username"
      clearable
    ></bo-input>
    <br>
    <!-- 密码可见 -->
    <bo-input
      type="password"
      name="password"
      placeholder="请输入密码"
      v-model="data.password"
      show-password
    ></bo-input>
    <br>
    <!-- 前面带图标 -->
    <bo-input
      type="text"
      name="username"
      placeholder="请输入用户名"
      v-model="data.username"
      prefix-icon="edit"
      suffix-icon="edit"
    ></bo-input>
    <br>
    <!-- 后面带图标 -->
    <bo-input
      type="text"
      name="username"
      placeholder="请输入用户名"
      v-model="data.username"
      suffix-icon="edit"
    ></bo-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        username: "",
        password: ""
      }
    };
  }
};
</script>
<style>
.bo-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 160px;
}
</style>