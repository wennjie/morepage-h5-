<template>
	<div class="tab-bar vux-1px-t">
		<div class="add" @click="push('addOrder')" v-if='farmers'>
			<div>
				<span>发布</span>
				
			</div>
		</div>
		<div class="tabs">
			<div class="tab" ref='tab' @click="push('HomePage')">
				<div class="icon">
					<img src="../../assets/images/icon/icon_order_h.png"  v-if="order=='true'"/>
					<img src="../../assets/images/icon/icon_order_n.png" v-else/>
				</div>
				<div class="info" :class="{'active':order=='true'}">
					植保需求
				</div>
				
			</div>
			<div class="vux-1px-r boder"></div>
			
			<div class="tab" ref='tab' @click="push('mine')">
				<div class="icon">
					<img src="../../assets/images/icon/icon_my_n.png" v-if="order=='true'"/>
					<img src="../../assets/images/icon/icon_my_h.png" v-else/>
				</div>
				<div class="info" :class="{'active':order=='false'}">
					我的
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
mui.init({
  swipeBack: true //启用右滑关闭功能
});
export default {
  props: {
    order: ""
  },
  data() {
    return {
      farmers: true
    };
  },
  mounted() {
    if (localStorage.getItem("inType") == "farmers") {
      this.farmers = true;
    } else {
      this.farmers = false;
    }
  },
  methods: {
    push(e) {
      this.$router.push({ path: e });
    }
  }
};
</script>

<style lang="less">
.tab-bar {
  position: fixed;
  width: 100%;
  height: 0.5rem;
  /*border-top:1px solid #E5E5E5 ;*/
  background: #fdfdfd;
  bottom: 0;
  .boder {
    margin: 0.1rem 0;
  }
  .add {
    position: absolute;
    width: 0.85rem;
    height: 0.85rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fdfdfd;
    border-radius: 50%;
    box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.1);
    margin-left: -0.425rem;
    left: 50%;
    bottom: 0.02rem;
    z-index: 1;

    div {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      background: #8ec1a0;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #ffffff;
        font-size: 0.13rem;
      }
    }
  }
  .tabs {
    width: 100%;
    height: 100%;
    display: flex;
    .tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;

      .icon {
        width: 0.21rem;
        height: 0.21rem;
        /*margin-bottom: 2px;*/
        margin-top: 0.05rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        margin-top: 0.05rem;
        /*line-height: ;*/
        font-size: 0.1rem;
        &.active {
          color: #8ec1a0;
        }
      }
    }
  }
}
</style>