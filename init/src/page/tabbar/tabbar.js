// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './tabbar.vue'

// import mixins from  '../config/mixins'

Vue.config.productionTip = false
import Resource from 'vue-resource'
Vue.use(Resource)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.filter('change', function(e) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
	if(e==undefined || e==null) return 
	return e.split("-").join('.')
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
//   mixins:[mixins],
  components: { App }
})
