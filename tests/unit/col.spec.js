import { shallowMount } from '@vue/test-utils'
import { expect } from "chai";
import Col from '@/packages/layout/col.vue'

describe('col.vue', () => {
    it('1.测试span是否ok',async ()=>{
        let wrapper = shallowMount(Col,{
            attachToDocument:true,
            slots:{
                default: `bo-col`
            },
            propsData: {
                span: 6
            }
        });
        
        expect(wrapper.vm.colClass).to.contains('bo-col-6')
        wrapper.setProps({
            offset:6
        })
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.colClass).to.contains('bo-col-offset-6')
    })
})