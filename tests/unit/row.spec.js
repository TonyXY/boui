import { shallowMount } from '@vue/test-utils'
import { expect } from "chai";
import Row from '@/packages/layout/row.vue'
import Col from '@/packages/layout/col.vue'

describe('row.vue', () => {
    it('1.测试gutter是否ok',async ()=>{
        let wrapper = shallowMount(Row,{
            attachToDocument:true,
            stubs:{
                'bo-col':Col
            },
            slots:{
                default:`<bo-col></bo-col>`
            },
            propsData:{
                gutter:20
            }
        });
        expect(getComputedStyle(wrapper.vm.$el).marginLeft).to.eq('-10px');
        expect(getComputedStyle(wrapper.vm.$el).marginRight).to.eq('-10px');
        await wrapper.vm.$nextTick();
        let col = wrapper.vm.$el.querySelector('.bo-col');
        expect(getComputedStyle(col).paddingRight).to.eq('10px');
        expect(getComputedStyle(col).paddingLeft).to.eq('10px');
    })
    it('2.测试justify属性', async () => {
        let wrapper = shallowMount(Row, {
            attachToDocument: true,
            stubs: {
                'bo-col': Col
            },
            slots: {
                default: `<bo-col></bo-col>`
            },
            propsData: {
                justify: 'start'
            }
        });
        expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-start');
        wrapper.setProps({justify:'end'});
        await wrapper.vm.$nextTick();
        expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-end');
        wrapper.setProps({justify:'space-between'});
        await wrapper.vm.$nextTick();
        expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('space-between');
    })
})