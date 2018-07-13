<template>
    <div class="page">
      <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#home">
				<span class="mui-icon iconhome"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#mine">
				<span class="mui-icon iconmine"></span>
        <!-- <span class="mui-badge">9</span> -->
				<span class="mui-tab-label">我的</span>
			</a>
		</nav>
        <div class="mui-content">
			<div id="home" class="mui-control-content mui-active">
			<homepage/>
			</div>
			<div id="mine" class="mui-control-content">
				<mine/>
			</div>
		
		</div>
    </div>
</template>
<script>
import homepage from "../homepage/homepage.vue";
import mine from "../mine/mine.vue";
export default {
  components: {
    homepage,
    mine
  }
};
// 关闭侧滑返回功能
mui.plusReady(function() {
  var wv = plus.webview.currentWebview();
  wv.setStyle({ popGesture: "none" });
});

var _toast = false;
mui.back = function() {
  if (!_toast || !_toast.isVisible()) {
    _toast = mui.toast("再按一次返回键退出", {
      duration: "long",
      type: "div"
    });
  } else {
    plus.runtime.quit();
  }
};
</script>

<style lang='scss'>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .mui-content {
    flex: 1;
    display: flex;
    .mui-control-content {
      flex: 1;
    }
  }
  .mui-icon {
    background-position: 50% 50%;
    background-size: cover;
  }
  .iconhome {
    background-image: url(../../assets/images/icon/icon_order_n.png);
    background-position: 50% 50%;
    background-size: cover;
  }
  .iconmine {
    background-image: url(../../assets/images/icon/icon_my_n.png);
    background-position: 50% 50%;
    background-size: cover;
  }
  .mui-tab-label {
    color: #000;
  }
  a.mui-tab-item.mui-active {
    .mui-tab-label {
      color: #8ec1a0;
    }
    .iconhome {
      background-image: url(../../assets/images/icon/icon_order_h.png);
      background-position: 50% 50%;
      background-size: cover;
    }
    .iconmine {
      background-image: url(../../assets/images/icon/icon_my_h.png);
      background-position: 50% 50%;
      background-size: cover;
    }
  }
}
</style>
