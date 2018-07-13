<template>
  <div class="scroll"
       :class="{
         'pull-down': (state === 0),
         'pull-up': (state === 1),
         refreshing: (state === 2),
         touching: touching
       }"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
      @scroll=" onScroll($event)"
       >
    <div class="scroll-inner"
      :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }"
      >
      <div class="preloader"  style="position: absolute;top: -30px;">
       
          <div class="infinite-preloader"></div>
          <div class="" style="height: 20px;">
          	<span v-if='ctr'>下拉刷新</span><span v-else>刷新中...</span>
          	<div style="height: 20px;"></div>
          </div>
          <!--<span class="" v-else>刷新中...</span>-->
        
      </div>
      
      <slot></slot>
      
      <div class="infinite-layer" v-if="upLoding">
        <slot name="infinite">
          <div class="infinite-preloader"></div>
          <div>加载中...</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loding:'',
    index:'',
    length:0,
    downloding:''
 
  },
  data () {
    return {
      top: 0,
      state: 0, // 0:down, 1: up, 2: refreshing
      startY: 0,
      touching: false,
      isup:false,
      upLoding:false,
      dowLoding:false,
      ctr:true,
      sctr:true
    }
  },
  watch:{
  	loding(e){
  		this.upLoding=e
  	},
  	downloding(e){
  		console.log(e)
  		this.dowLoding=e
  		
  		if(!e){
  			this.top = 0
  			this.ctr=true
  			this.sctr=true
  		}
  	}
  },
  methods: {
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
      this.startScroll = this.$el.scrollTop || 0
      this.touching = true
    },
    touchMove (e) {
    	let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.scroll-inner').clientHeight
      let scrollTop = this.$el.scrollTop
     
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
//     console.log(diff)
      if(diff>0){
      	 this.top = Math.pow(diff, 0.65)
      }
      
      if(diff>100&&this.downloding!=undefined){
      	this.sctr=false
      	this.dowLoding=true
      	this.$emit('DOWNRES',this.index)
      }
      this.diff=diff
    },
    touchEnd (e) {
    	console.log(this.downloding)
      this.touching = false
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.scroll-inner').clientHeight
      let scrollTop = this.$el.scrollTop
      if(this.diff>0){
      	this.top = 0
      }
       if(this.diff>100&&this.downloding!=undefined){
//    	this.dowLoding=false
//console.log(this.downloding,'loding',this.diff)
				this.top = 40
				this.ctr=false
      	this.$emit('DOWN')
      	this.diff=0
      }

      
      if(this.isup&& !this.upLoding&&this.length==50){ //
      	this.upLoding=true
      	
      	this.$emit('upLoding',this.index)
      }
    },

    onScroll (e) {
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.scroll-inner').clientHeight
      let scrollTop = this.$el.scrollTop
//    console.log(innerHeight-outerHeight)
      //ios  //安卓
      if(innerHeight<=outerHeight+scrollTop){
      	this.isup=true
      }else{
      	this.isup=false
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import './scroll.less';
.preloader{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	
	.infinite-preloader{
		width:20px;
	}
}
</style>
