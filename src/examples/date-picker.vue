<template>
  <div id="app">
    <bo-date-picker v-model="value1">
      
    </bo-date-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1:''
    };
  },

};
</script>
<style>
.bo-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 160px;
}
</style>