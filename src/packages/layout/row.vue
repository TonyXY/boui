<template>
  <div class="bo-row" :style="rowStyl">
    <slot></slot>
  </div>
</template>
<script>
export default {
    name:"bo-row",
    props:{
        gutter:{
            type:Number,
            default:0
        },
        justify:{
            type:String,
            validator(type){
                if(type && !['start','end','center','space-around','space-between'].includes(type)){
                    console.error('类型必须是:'+['start','end','center','space-around','space-between'].join('|'))
                }
                return true
            }
        }
    },
    computed:{
        rowStyl(){
            let style = {};
            if(this.gutter){
                style = {
                    ...style,
                    marginLeft:-this.gutter/2+'px',
                    marginRight:-this.gutter/2+'px'
                }
            }
            if(this.justify){
                let key = ['start','end'].includes(this.justify)?'flex-'+this.justify :this.justify;
                style = {
                    ...style,
                    justifyContent:key
                }
            }
            return style;
        }
    },
    mounted(){
        this.$children.forEach(child=>{
            child.gutter = this.gutter
        })
    }
}
</script>
<style lang="scss">
.bo-row{
    display: flex;
    flex-wrap: wrap;  
}
</style>