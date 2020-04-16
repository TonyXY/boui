<template>
  <div
    class="bo-col"
    :class="colClass"
    :style="colStyl"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "bo-col",
  data() {
    return { gutter: 0 };
  },
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: null
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    colClass() {
      // 统一管理我们的样式
      let classes = [];
      classes.push(`bo-col-${this.span}`);
      if (this.offset) {
        // 用户传入了偏移量
        classes.push(`bo-col-offset-${this.offset}`);
      }
      ["xs", "sm", "md", "lg", "xl"].forEach(type => {
        if (typeof this[type] === "object") {
          let { span, offset } = this[type];
          span && classes.push(`bo-col-${type}-${span}`);
          offset && classes.push(`bo-col-${type}-offset-${offset}`);
        } else {
          this[type] && classes.push(`bo-col-${type}-${this[type]}`);
        }
      });
      return classes;
    },
    colStyl() {
      let style = {};
      if (this.gutter) {
        style = {
          ...style,
          paddingLeft: this.gutter / 2 + "px",
          paddingRight: this.gutter / 2 + "px"
        };
      }
      return style;
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/_var.scss";
// 需要通过循环24 来创造出不同的宽度
@for $i from 1 through 24 {
  .bo-col-#{$i} {
    width: $i/24 * 100%;
  }
  .bo-col-offset-#{$i} {
    margin-left: $i/24 * 100%;
  }
}
@include res(xs) {
  @for $i from 1 through 24 {
    .bo-col-xs-#{$i} {
      width: $i/24 * 100%;
    }
    .bo-col-xs-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(sm) {
  @for $i from 1 through 24 {
    .bo-col-sm-#{$i} {
      width: $i/24 * 100%;
    }
    .bo-col-sm-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(md) {
  @for $i from 1 through 24 {
    .bo-col-md-#{$i} {
      width: $i/24 * 100%;
    }
    .bo-col-md-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(lg) {
  @for $i from 1 through 24 {
    .bo-col-lg-#{$i} {
      width: $i/24 * 100%;
    }
    .bo-col-lg-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(xl) {
  @for $i from 1 through 24 {
    .bo-col-xl-#{$i} {
      width: $i/24 * 100%;
    }
    .bo-col-xl-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
</style>