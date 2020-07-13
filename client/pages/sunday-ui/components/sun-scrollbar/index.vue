<template>
    <div class="sun-scrollbar">
        <div class="sun-scrollbar__wrap" :style="styleObject"  @scroll="handleScroll" ref="view">
           <div class="sun-scrollbar__view" ><slot></slot></div>
        </div>
        <div v-if="viewHeight>maxHeight" class="is-vertical sun-scrollbar__bar" @click.stop @mousedown="trackYHandle($event)">
            <div class="sun-scrollbar__thumb" :style="{'height':scrollbarHeight+'px','transform':'translateY('+moveY+'px)'}" @click.stop  ref="barY"></div>
        </div>
         <div v-if="viewWidth>maxWidth"  class="is-horizontal sun-scrollbar__bar" @click.stop  @mousedown="trackXHandle($event)" >
            <div class="sun-scrollbar__thumb" :style="{'width':scrollbarWidth+'px','transform':'translateX('+moveX+'px)'}" @click.stop ref="barX"></div>
        </div>
    </div>   
</template>
<script>
import '../../assets/scss/style.vue.scss';
export default {
    name : "sun-scrollbar",
    data(){
        return {
            viewHeight:0, //滚动元素总高度
            viewWidth:0, //滚动元素总宽度
            scrollbarHeight:0,  //纵向滚动条高度
            scrollbarWidth:0,  //横向滚动条长度
            moveY:0,//纵向滚动条偏移量
            moveX:0,//横向滚动条偏移量
        }
    },
    props:{
        maxHeight:{
            type:Number,
            default:1500
            },
        maxWidth:{
            type:Number,
            default:1500}
    },
    computed:{
        styleObject(){
            return {
                'max-height':this.maxHeight+'px',
                'max-width':this.maxWidth+'px',
                'margin-right':'-17px',
                'margin-bottom':'-17px'
            }
        }
    },
    mounted(){
        const scrollElement=this.$refs.view;
        this.viewHeight=Math.max(scrollElement.clientHeight,scrollElement.scrollHeight);
        this.viewWidth=Math.max(scrollElement.clientWidth,scrollElement.scrollWidth);
        this.scrollbarHeight=(this.maxHeight-17)/this.viewHeight*(this.maxHeight-17);
        this.scrollbarWidth=(this.maxWidth-17)/this.viewWidth*(this.maxWidth-17);  
    },
    methods:{
        handleScroll(){
            this.moveY=(this.$refs.view.scrollTop/this.viewHeight)*(this.maxHeight-17);
            this.moveX=(this.$refs.view.scrollLeft/this.viewWidth)*(this.maxWidth-17);
        },
        trackYHandle(e){
            const rect=this.$refs.barY.getBoundingClientRect();
            const view= this.$refs.view
            if(e.clientY<rect.y){
                this.moveY=0;
                view.scrollTop=0;
                }
            else{
                this.moveY=(this.maxHeight-17)-this.scrollbarHeight;
                view.scrollTop=this.viewHeight-(this.maxHeight-17);
            }           
        },
         trackXHandle(e){
            const rect=this.$refs.barX.getBoundingClientRect();
            const view= this.$refs.view;
            if(e.clientX<rect.x){
                this.moveX=0;
                view.scrollLeft=0;
            }
            else{
                this.moveX=(this.maxWidth-17)-this.scrollbarWidth;
                view.scrollLeft=this.viewWidth-(this.maxWidth-17);
            }
              
        }
    }
}
</script>