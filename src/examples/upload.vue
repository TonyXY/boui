<template>
  <div id="app">
    <bo-upload
      name="avatar"
      action="http://localhost:3000/upload"
      :file-list="fileList"
      :limit="3"
      accept="image/jpeg"
      :multiple="true"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :beforeUpload="beforeUpload"
      :drag="true"
    >
      <bo-button
        type="primary"
        icon="shangchuan"
      >点击上传</bo-button>
      <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </bo-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [{ url: "xxx", name: "珠峰架构" }]
    };
  },
  methods: {
    handleExceed() {},
    handleProgress() {},
    handleSuccess() {},
    handleError() {},
    handleChange() {},
    beforeUpload(rawFile) {
      let limitSize = rawFile.size / 1024 > 500;
      if (limitSize) {
        console.log("当前超过了500k");
        return false;
      } else if (!rawFile.name.endsWith(".jpeg")) {
        console.log("文件类型不对");
        return false;
      }
      return true;
    }
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