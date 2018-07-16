// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'

// import mixins from  '../config/mixins'

Vue.config.productionTip = false
import Resource from 'vue-resource'
Vue.use(Resource)
import {Switch,Checkbox} from 'element-ui'
Vue.use(Switch)
Vue.use(Checkbox)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
//   mixins:[mixins],
  components: { App }
})
