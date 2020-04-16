<template>
  <div
    class="bo-input"
    :class="inputClass"
  >
    <bo-icon
      class="prefix-icon"
      :icon="prefixIcon"
      v-if="prefixIcon"
    ></bo-icon>
    <bo-icon
      :icon="suffixIcon"
      v-if="suffixIcon"
    ></bo-icon>
    <input
      v-bind="$attrs"
      :type="showPassword?(passwordVisible?'text':'password'):type"
      :disabled="disabled"
      :readonly="readonly"
      :value="value"
      ref="input"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @change="$emit('change',$event)"
    >
    <bo-icon
      icon="qingkong"
      v-if="showClear"
      @click.native="$emit('input','')"
      @mousedown.native.prevent
    >
    </bo-icon>
    <bo-icon
      icon="eye"
      v-if="showPwdVisible"
      @click.native="changeStatus"
    >
    </bo-icon>
  </div>
</template>
<script>
export default {
  name: "bo-input",
  inheritAttrs: false,
  data() {
    return {
      passwordVisible: false,
      hovering: false,
      focused: false
    };
  },
  props: {
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String
  },
  computed: {
    inputClass() {
      let classes = [];
      if (this.clearable || this.showPassword || this.suffixIcon) {
        classes.push("bo-input-suffix-icon");
      }
      if (this.prefixIcon) {
        classes.push("bo-input-prefix-icon");
      }
      return classes;
    },
    showClear() {
      return (
        this.clearable &&
        !this.disabled &&
        this.focused
      );
    },
    showPwdVisible() {
      return (
        this.showPassword &&
        !this.disabled &&
        (!!this.value || this.focused)
      );
    },
    upperLimit() {
      return this.$attrs.maxlength;
    }
  },
  methods: {
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    focus() {
      this.getInput().focus();
    },
    changeStatus() {
      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(this.focus);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    handleInput(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/_var.scss";
$border-color: #dcdfe6;
.bo-input {
  display: inline-flex;
  position: relative;
  input {
    padding: 8px;
    width: 150px;
    height: 42px;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    &:focus {
      border-color: $primary;
      outline: none;
      box-shadow: inset -1px 0 2px $primary, inset 1px 1px 1px $primary;
    }
    &[disabled] {
      cursor: not-allowed;
    }
  }
  .bo-icon {
    top: 13px;
    position: absolute;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }

  &.bo-input-suffix-icon {
    input {
      padding-right: 25px;
    }
    .bo-icon {
      right: 8px;
    }
  }
  &.bo-input-prefix-icon {
    input {
      padding-left: 25px;
    }
    .prefix-icon {
      left: 8px;
      right: none;
    }
  }
}
</style>