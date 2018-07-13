/**
 * 程序入口文件，加载各种公共组件
 */
// 引用 vue
import Vue from 'vue'
// 引用路由 vue-router
import VueRouter from 'vue-router'
import routes from './config/router'
import BaiduMap from 'vue-baidu-map'
// 引用 页面入口文件
import App from './App'

import { Upload } from 'element-ui'
Vue.use(Upload)

// 引用 消除点击延时插件
// import FastClick from 'fastclick'
// 引用 vux插件 微信jssdk、Toast
import { ToastPlugin,LoadingPlugin,DatetimePlugin } from 'vux'


Vue.use(DatetimePlugin)
Vue.use(LoadingPlugin)

// 或者umd方式
// 引入构建的js文件
//store
import store from './store'

import Resource from 'vue-resource'
Vue.use(Resource)

require('es6-promise').polyfill()
// 默认参数
Vue.use(ToastPlugin)
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.use(BaiduMap, {
	// ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
	ak: 'xfH0SN2kV0pGN70MTDDWhMUlyRWs4vye'
})
// 使用 vue路由
Vue.use(VueRouter)
Vue.filter('change', function(e) { //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
	if(e==undefined || e==null) return 
	return e.split("-").join('.')
});

// 使用 微信jssdk
//Vue.use(WechatPlugin)

// 修改title
Vue.use(require('vue-wechat-title'))

const router = new VueRouter({
	//	 mode: 'history',
	routes
})

window.HTTPS = 'http://192.168.1.104/'

router.beforeEach(function(to, from, next) {
	store.commit('updateLoadingStatus', {
		isLoading: true
	})
	next()
})

router.afterEach(function(to) {
	store.commit('updateLoadingStatus', {
		isLoading: false
	})
})

//FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-unused-vars */

window.resMsg = function(e) {
	return e.split('：')[1]
}
window.toastFiltr = function(e) {
	return e.split('：')[1]
}
window.toast = function(info) {
	Vue.$vux.toast.text(info, 'middle')
}

var vm = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')