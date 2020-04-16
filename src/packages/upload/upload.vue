<template>
  <div class="bo-upload">
    <upload-dragger
      v-if="drag"
      :accept="accept"
      @file="uploadFiles"
    ></upload-dragger>
    <template v-else>
      <div
        @click="handleClick"
        class="bo-upload-btn"
      >
        <slot></slot>
      </div>
      <input
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="handleChange"
        :name="name"
        ref="input"
        class="input"
      >
    </template>
    <div>
      <slot name="tip"></slot>
    </div>
    <ul>
      <li
        v-for="file in files"
        :key="file.uid"
      >
        <div class="bo-uplod-list-item">
          <bo-icon icon="file"></bo-icon>
          <img
            :src="file.url"
            alt=""
          >
          {{file.name}}
          <bo-progress
            v-if="file.status ==='uploading'"
            :percentage="file.percentage"
          ></bo-progress>
          <bo-icon icon="cha"></bo-icon>
        </div>

      </li>
    </ul>
  </div>
</template>
<script>
import UploadDragger from "./upload-dragger.vue";
import ajax from "./ajax";
export default {
  name: "bo-upload",
  components: {
    UploadDragger
  },
  props: {
    name: {
      type: String,
      default: "file"
    },
    action: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      default: () => []
    },
    accept: String,
    limit: Number,
    multiple: {
      type: Boolean,
      default: false
    },
    onExceed: Function,
    onChange: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    beforeUpload: Function,
    httpRequest: {
      type: Function,
      default: ajax
    },
    drag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempIndex: 1,
      files: [],
      reqs: {}
    };
  },
  watch: {
    fileList: {
      immediate: true,
      handler(fileList) {
        this.files = fileList.map(item => {
          item.uid = Date.now() + this.tempIndex++;
          item.status = "success";
          return item;
        });
      }
    }
  },
  methods: {
    handleClick() {
      this.$refs.input.value = "";
      this.$refs.input.click();
    },
    handleStart(rawFile) {
      rawFile.uid = Math.random() + this.tempIndex++;
      let file = {
        status: "ready",
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };
      file.url = URL.createObjectURL(rawFile);
      this.files.push(file);
      this.onChange && this.onChange(file);
    },
    getFile(rawFile) {
      return this.files.find(file => file.uid == rawFile.uid);
    },
    handleProgress(ev, rawFile) {
      let file = this.getFile(rawFile);
      file.status = "uploading";
      file.percentage = ev.percent || 0;
      this.onProgress(ev, rawFile);
    },
    handleSuccess(res, rawFile) {
      let file = this.getFile(rawFile);
      file.status = "success";
      this.onSuccess(res, rawFile);
      this.onChange(file);
    },
    handleError(err, rawFile) {
      let file = this.getFile(rawFile);
      file.status = "fail";
      this.onError(err, rawFile);
      this.onChange(file);
      delete this.reqs[file.uid]; // 已经失败的ajax 不需要后续在中断请求
    },
    post(rawFile) {
      const uid = rawFile.uid;
      const options = {
        file: rawFile,
        filename: this.name,
        action: this.action,
        onProgress: ev => {
          this.handleProgress(ev, rawFile);
        },
        onSuccess: res => {
          this.handleSuccess(res, rawFile);
        },
        onError: err => {
          this.handleError(err, rawFile);
        }
      };
      let req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    upload(rawFile) {
      let flag = true;
      if (this.beforeUpload) {
        flag = this.beforeUpload(rawFile);
      }
      if (flag) {
        return this.post(rawFile);
      }
    },
    uploadFiles(files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList);
      }
      [...files].forEach(rawFile => {
        this.handleStart(rawFile);
        this.upload(rawFile);
      });
    },
    handleChange(e) {
      const files = e.target.files;
      this.uploadFiles(files);
    }
  }
};
</script>
<style lang="scss">
.bo-upload {
  .bo-upload-btn {
    display: inline-block;
  }
  .input {
    display: none;
  }
  .bo-uplod-list-item img {
    width: 100px;
  }
}
</style>