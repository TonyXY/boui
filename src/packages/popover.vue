<template>
    <div class="bo-popover">
        <div
            class="bo-popover-content"
            :class="`content-${placement}`"
            :style="conStyle"
            v-if="visible"
            ref="content"
            @click.stop
        >
            <h3 v-if="title">{{ title }}</h3>
            <slot>{{ content }}</slot>
            <div class="arrow"></div>
        </div>
        <slot name="reference"></slot>
    </div>
</template>
<script>
const on = (element, event, handler) => {
    element.addEventListener(event, handler, false);
};
const off = (element, event, handler) => {
    element.removeEventListener(event, handler, false);
};
const getOffset = el => {
    let rect = el.getBoundingClientRect();
    let clientTop = document.documentElement.clientTop;
    let clientLeft = document.documentElement.clientLeft;
    return {
        width: rect.width,
        height: rect.height,
        // 兼容ie多出的两个px
        top: rect.top - clientTop, // 距离顶部的位置
        bottom: document.documentElement.clientHeight - rect.bottom, // 距离顶部加上元素本身的高度就等于bottom的位置
        left: rect.left - clientLeft, // 距离左边的位置
        right: document.documentElement.clientWidth - rect.right
    };
};
export default {
    name: "bo-popover",
    props: {
        value: {
            default: false,
            type: Boolean
        },
        placement: {
            validator(type) {
                if (!["top", "bottom", "left", "right"].includes(type)) {
                    throw new Error("属性必须是" + ["top", "bottom", "left", "right"].join("|"));
                }
                return true;
            }
        },
        width: {
            type: String
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        trigger: {
            type: String // click/hover
        }
    },
    data() {
        return {
            visible: false,
            conStyle: {}
        };
    },
    computed: {},
    watch: {
        visible(value) {
            this.$emit("input", value);
        },
        value: {
            immediate: true,
            handler(value) {
                this.visible = value;
                if (value) {
                    this.$nextTick(() => {
                        let content = this.$refs.content;
                        document.body.appendChild(content);
                        if (this.trigger === "hover") {
                            on(content, "mouseenter", this.handleMouseEnter);
                            on(content, "mouseleave", this.handleMouseLeave);
                        }
                        this.handleStyle();
                    });
                }
            }
        }
    },
    methods: {
        handleStyle() {
            let style = {
                width:this.width
            };
            let content = this.$refs.content;
            let offset = getOffset(this.reference);
            if (this.placement === "top") {
                style = {
                    ...style,
                    bottom: offset.bottom + offset.height + 8 + "px",
                    left: offset.left + offset.width / 2 + "px",
                    transform: "translateX(-50%)"
                };
            }else if (this.placement === "bottom") {
                style = {
                    ...style,
                    top: offset.top + offset.height + 8 + "px",
                    left: offset.left + offset.width / 2 + "px",
                    transform: "translateX(-50%)"
                };
            }else if (this.placement === "left") {
                style = {
                    ...style,
                    right: offset.right+offset.width+8+ "px",
                    top: offset.top + offset.height / 2 + "px",
                    transform: "translateY(-50%)"
                };
            }else if (this.placement === "right") {
                style = {
                    ...style,
                    left: offset.left+offset.width+8+ "px",
                    top: offset.top + offset.height / 2 + "px",
                    transform: "translateY(-50%)"
                };
            }
            this.conStyle = style;
        },
        handleDocumentClick(e) {
            if (this.$el.contains(e.target)) {
                return false;
            }
            this.visible = false;
        },
        toggle() {
            this.visible = !this.visible;
        },
        handleMouseEnter() {
            clearTimeout(this.timer);
            this.visible = true;
        },
        handleMouseLeave() {
            this.timer = setTimeout(() => {
                this.visible = false;
            }, 200);
        }
    },
    mounted() {
        let reference = this.$slots.reference;
        if (reference) {
            this.reference = reference[0].elm;
        }
        if (this.trigger === "hover") {
            on(this.$el, "mouseenter", this.handleMouseEnter);
            on(this.$el, "mouseleave", this.handleMouseLeave);
        } else if (this.trigger === "click") {
            on(this.reference, "click", this.toggle);
            on(document, "click", this.handleDocumentClick);
        }
    },
    beforeDestory() {
        off(this.$el, "mouseenter", this.handleMouseEnter);
        off(this.$el, "mouseleave", this.handleMouseLeave);
        off(this.reference, "click", this.toggle);
        off(document, "click", this.handleDocumentClick);
    }
};
</script>
<style lang="scss">
$borderColor: #ccc;
.bo-popover {
    display: inline-block;
    position: relative;
}
.bo-popover-content {
    position: absolute;
    // top: 100px;
    // left: 100px;
    padding: 10px;
    border-radius: 4px;
    z-index: 10;
    box-shadow: -1px -1px 3px $borderColor, 1px 1px 3px $borderColor;
    background: #fff;
}

.arrow {
    position: absolute;
    &::before,
    &::after {
        position: absolute;
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: $borderColor;
    }
    &::after {
        border-bottom-color: #fff;
        transform: translateY(1px);
        filter: drop-shadow(0 -2px 1px $borderColor);
    }
}
.content-top {
    .arrow {
        left: 50%;
        margin-left: -6px;
        bottom: 0px;
        &::after,
        &::before {
            transform: rotate(180deg);
        }
    }
}
.content-bottom {
    .arrow {
        left: 50%;
        margin-left: -6px;
        top: -12px;
    }
}
.content-left {
    .arrow {
        top: 50%;
        margin-top: -6px;
        right: 0;
        &::after,
        &::before {
            transform: rotate(90deg);
        }
    }
}
.content-right {
    .arrow {
        top: 50%;
        margin-top: -6px;
        left: -12px;
        &::after,
        &::before {
            transform: rotate(-90deg);
        }
    }
}
</style>
