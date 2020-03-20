
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Button from '@/packages/button.vue'
import Icon from '@/packages/icon.vue'

describe('button.vue', () => {
  it('1.测试button能否正常显示slot里的内容', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'bo-ui'
      }
    })
    expect(wrapper.text()).to.eq('bo-ui');
  })
  it('2.测试icon传入是否能正常显示', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        'bo-icon': Icon
      },
      propsData: {
        icon: 'edit'
      }
    })
    expect(wrapper.find('use').attributes('href')).to.eq('#icon-edit')
  })
  it('3.测试loading时 按钮是禁用状态', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        'bo-icon': Icon // 替换的功能
      },
      propsData: {
        loading: true
      }
    });
    expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading')
    expect(wrapper.find('button').attributes('disabled')).to.eq('disabled')
  })
  it('4.测试按钮能否正常点击', () => {
    const wrapper = shallowMount(Button, {
      stubs: ['bo-icon'] // 不去渲染icon 只是一个加标签
    });
    
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click').length).to.eq(1)
  })
  it('5.测试传入的position是否正常显示', () => {
    const wrapper = shallowMount(Button, {
      attachToDocument: true, // 将组件挂载到浏览器上
      stubs: {
        'bo-icon': Icon // 替换的功能
      },
      slots: {
        default: 'bo-ui'
      },
      propsData: {
        iconPosition: 'left',
        icon: 'edit'
      }
    });
    let ele = wrapper.vm.$el.querySelector('span');
    expect(getComputedStyle(ele).order).to.eq('0');
    wrapper.setProps({iconPosition:'right'}); // 设置props 必
    return wrapper.vm.$nextTick().then(() => {
      expect(getComputedStyle(ele).order).to.eq('1');
    })
  })
})
