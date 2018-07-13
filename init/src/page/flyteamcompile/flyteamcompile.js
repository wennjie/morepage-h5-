// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './flyteamcompile.vue'


Vue.config.productionTip = false
import Resource from 'vue-resource'
Vue.use(Resource)
window.HTTPS = 'https://devel.skylinuav.com/'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
	// ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
	ak: 'xfH0SN2kV0pGN70MTDDWhMUlyRWs4vye'
})

import { LoadingPlugin } from 'vux'


Vue.use(LoadingPlugin)
import { Upload } from 'element-ui'
Vue.use(Upload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
