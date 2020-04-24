import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import Carousel from "@/packages/carousel/carousel.vue";
import CarouselItem from "@/packages/carousel/carousel-item.vue";
import Button from "@/packages/button/button.vue";
import Icon from "@/packages/icon.vue";

describe('测试 当前carousel组件',()=>{
    it("1.测试 initialIndex 传入后是否符合我的预期",()=>{
        let wrapper = shallowMount(Carousel, {
            attachToDocument: true,
            stubs: {
                "bo-carousel-item": CarouselItem,
                "bo-button": Button,
                "bo-icon": Icon
            },
            slots: {
                default: `
                <bo-carousel-item>
                    <div class="content" style="background:red">内容1</div>
                </bo-carousel-item>
                <bo-carousel-item>
                    <div class="content" style="background:blue">内容2</div>
                </bo-carousel-item>
                <bo-carousel-item>
                    <div class="content" style="background:yellow">内容3</div>
                </bo-carousel-item>
                `
            },
            propsData:{
                initialIndex:1,
                height:'300px'
            }
        });
        let item = wrapper.findAll('.content');
        expect(item.length).to.eq(1);
        expect(item.at(0).text()).to.eq('内容2');
    })
})
