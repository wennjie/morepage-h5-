webpackJsonp([10],{110:function(t,e,i){function n(t){i(140)}var s=i(0)(i(118),i(149),n,null,null);t.exports=s.exports},118:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(13),s=i.n(n),o=i(89),a=i.n(o),r=i(84),c=i.n(r),l=i(3),u=i.n(l);e.default={data:function(){return{item:[],inType:localStorage.getItem("inType"),page:1,type:"_id",event:"up",showloding:!1,ydshow:!0}},components:{items:a.a,LoadMore:c.a,wheader:u.a},beforeCreate:function(){},created:function(){var t=localStorage.getItem("first");void 0!=t&&null!=t&&(console.log(void 0===t?"undefined":s()(t)),this.ydshow=t)},beforeMount:function(){},mounted:function(){console.log(localStorage.getItem("user"))},beforeUpdate:function(){},Updated:function(){},watch:{type:function(t){var e=function(){};this.event="up",this.getDemandList(t,1,e)},item:function(t){console.log(t.length)}},methods:{first:function(t){this.ydshow=t},loding:function(t){return t?"加载中":"暂无其余数据"},headerRes:function(t){var e=null;switch(t){case"按距离排序":e="distance";break;case"按时间排序":e="_id"}this.type=e},infinite:function(t){function e(){setTimeout(function(){t()},1e3)}this.event="down",this.getDemandList(this.type,this.page,e)},refresh:function(t){function e(){setTimeout(function(){t()},1e3)}this.event="up",this.page=1,this.getDemandList(this.type,1,e)},getDemandList:function(t,e,i){var n=this;this.$http.get(HTTPS+"work/Public/demand/?service=Demand.DemandList&token="+JSON.parse(localStorage.getItem("user")).token+"&order["+t+"]=-1&page="+e+"&point[longitude]=0&point[latitude]=0&type="+this.inType,{timeout:3e4}).then(function(t){var s=t.body;n.event;if(200==s.ret){if(1==e)n.item=s.data.data,n.page++;else{for(var o in s.data.data)n.item.push(s.data.data[o]);0==s.data.data.length||n.page++}i()}else toast(resMsg(t.body.msg))},function(t){toast("网络连接失败")})}}}},140:function(t,e){},149:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-page page"},[i("wheader",{attrs:{back:!1}}),t._v(" "),i("scroller",{staticClass:"scroll",attrs:{"on-refresh":t.refresh,"on-infinite":t.infinite}},[t._l(t.item,function(t,e){return i("items",{key:e,attrs:{items:t}})}),t._v(" "),i("load-more",{attrs:{"show-loading":t.showloding,tip:t.loding(t.showloding),"background-color":"#fbf9fe"}})],2)],1)},staticRenderFns:[]}},205:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(1),s=i(110),o=i.n(s),a=i(42),r=i.n(a),c=i(2);n.default.use(r.a),n.default.config.productionTip=!1,n.default.use(c.a),window.HTTPS="https://devel.skylinuav.com/",n.default.filter("change",function(t){if(void 0!=t&&null!=t)return t.split("-").join(".")}),new n.default({el:"#app",template:"<App/>",components:{App:o.a}})},3:function(t,e,i){function n(t){i(5)}var s=i(0)(i(4),i(6),n,null,null);t.exports=s.exports},4:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:{type:String,default:"植保需求"},back:{type:Boolean,default:!0},hide:{type:Boolean,default:!1}},methods:{push:function(t){router(t)}}}},47:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"load-more",props:{showLoading:{type:Boolean,default:!0},tip:String}}},5:function(t,e){},54:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(7),s=i.n(n);e.default={props:{items:{type:Object,default:function(){return{}}}},data:function(){return{farmers:!0,user:JSON.parse(localStorage.getItem("user"))}},mounted:function(){"farmers"==localStorage.getItem("inType")?this.farmers=!0:this.farmers=!1},methods:{show:function(t){for(var e in t)if(t[e].id==this.user.id)return t[e].selected},showlable:function(t){for(var e in t)if(t[e].id==this.user.id)return!0},push:function(t){localStorage.setItem("itemsList",s()(this.items)),router("./orderdetails.html")},filterImg:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return filterImg(t)})},computed:{},filters:{}}},58:function(t,e){},6:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",{staticClass:"mui-bar mui-bar-nav"},[i("h1",{staticClass:"mui-title",attrs:{id:"title"}},[t._v(t._s(t.title))]),t._v(" "),t.hide?t._e():i("div",[t.back?i("a",{staticClass:"mui-action-back mui-icon mui-icon-left-nav mui-pull-left"}):i("a",{staticClass:"mui-icon mui-icon-plusempty mui-pull-left",on:{click:function(e){t.push("./addorder.html")}}}),t._v(" "),t.back?t._e():i("div",{staticClass:"mui-pull-right",on:{click:function(e){t.push("./orderhistory.html")}}},[t._v("历史")])])])},staticRenderFns:[]}},60:function(t,e){},67:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAAEx0v4+AAAAAXNSR0IArs4c6QAAAzJJREFUOBGVlEtIlFEUx/2+GdRxZtGgNURoIZIURS2ysBbVJigdaDVtjDAqImUo8BWB2SIY5+HIZIRCrW1qp+CihSH0cIQIIigDF0r0wKjIdHzMTL9zmfv5aQ/owjfn9T//c+65905BASscDneKLAiFQi+UYv/BmVM2yvHVQHd396RlEUpoQ+H5ebTGoQ2R8Xh8Wy6XMy1fIpEogu+O5cD4qo1kMuno6empMknxi5NgVyAQyCwtLb0zWVvEiRyJxWLlSgfZJEpra+s4utvr9RaKrVYkEqnVuqEV+v1oGMYm0Dehmslms2eJHcBX297e/lyK7gf0TSeIlEa03dfXVyo7l02NlZSU+HQgL6u03dzc/EV0J2Uq5ufn0+hWG5RqkCDM1bRSijpnBXEO4DxPTzMEptEPIbM+n8/d2NiYtoA45SjrqOAH9N7lcoWDweCi+GUpoIwhk8k8xR4HeI8dl8N8DfsTbWxWQJm7jLmystIpIxenXlRIkHAasNcUkMfjKdMgGYUGdnR0BGnDiEajNerM9Qg0YJ2sX1lZ6V+9HLbo6OioU5vMeILyO38DUs5IpVLPGNd9AafT6ZOIMRP0T/o6qBlE0nyN2+2+JDoTGGQSDQY3rnBqamrR6XTuaGlpeSNBvWCdZDMfqHJYzZERudj9HACp8ARZAaAcpv62traLOtGSBE0ZPuPYajnzypojFB9PZcPy8vJVepMePXncGkHVH5Dexhmire/2oEXIGz8GyRBBeQqPae8K7b20g7UOdi/YOPYRyOXe+BmUetCKkCkO46wjmCRwSidqmR/9A2IPtU8kXRqQDyID5A4T95s4IsTktkb/RJZPDCB3iW5fkOQkR3IhrRcuk9bPCKi4uDhsB/+PrnOFS27YgiTzWl1/I6GTu8Q62forvqPrcbbcBbknMQEgb60HapttneMzOaQ9bG07M5+FWO6XWjpXtq4OhWAXwOtEpx0ORw1/fp/z2H+K3t5eH28kBagC0i6K3rCuDZe0jH+JEYj3EZSrIPdsANBbOyvFq7Ev8DWBLUJO8HxO8HxmBWcRiqEXW9qNfpnPz7dR+0VSTLofgizOpX5tj4n+C6rRf8q9CF7NAAAAAElFTkSuQmCC"},68:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAVCAYAAAE8zI55AAAAAXNSR0IArs4c6QAAAVhJREFUOBGtVDFOxDAQPDt5Ax0fuE8c1UnXIhp+QUOUCum6xGn4AhISDdBSIt5yDf2ViIQZ3621jhxiTkRK1js7nvXa3iwW+mnbtqffNM1gh2EwIYjIY3CigQH5C0gZoVTQAH2v5pxbSwAZdjL2llmoF02NGHmO0Vk4xXRdd9b3/T1SXhtjnrQOMWutK0H4lKoJahLHiFd+W+q69sVMWb+B49naZ40l1rFHxW86oMdYwsFNbb7GDBwH9m2qMmKo7mZ2X0H8tjp/aowsRVZ1QUmOc2y9uoCpVMQYD0pTJOJZJH9Ff9txCO15LEu851PpqqraRDEucq4QTkjxeCrviF2QcOqD1X5YfFanCsg8nO4q9DEuzZUE/mLRJc/kl1DzXYINeyGAUl9p0TWXmT5poz8LgKIoHnzk+JnzhRtaQPpWArlWTjnrtuWI/psQS9si411O1ikOrtD2B5Bxrn+Xuy9MAAAAAElFTkSuQmCC"},70:function(t,e,i){t.exports=i.p+"static/img/ybm.416ccb4.png"},71:function(t,e,i){t.exports=i.p+"static/img/yxz.3a2fd75.png"},72:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-loadmore weui-loadmore",class:{"weui-loadmore_line":!t.showLoading,"weui-loadmore_dot":!t.showLoading&&!t.tip}},[t.showLoading?i("i",{staticClass:"weui-loading"}):t._e(),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:t.tip||!t.showLoading,expression:"tip || !showLoading"}],staticClass:"weui-loadmore__tips"},[t._v(t._s(t.tip))])])},staticRenderFns:[]}},74:function(t,e,i){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"items",on:{click:function(e){t.push(t.items._id)}}},[!t.farmers&&0!=t.items.fly_teams.length&&t.showlable(t.items.fly_teams)?n("div",[t.show(t.items.fly_teams)?n("img",{staticClass:"lable",attrs:{src:i(71)}}):n("img",{staticClass:"lable",attrs:{src:i(70)}})]):t._e(),t._v(" "),n("div",{staticClass:"logo"},[n("div",{staticClass:"icon-box",class:t.filterImg(t.items.add.corptype)})]),t._v(" "),n("div",{staticClass:"lits"},[n("div",{staticClass:"line"},[n("div",[t._v(t._s(t.items.add.corptype))]),t._v(" "),n("div",[n("span",[t._v("￥"+t._s(t.items.add.price)+"元")]),t._v("/亩")])]),t._v(" "),n("div",{staticClass:"line"},[n("div",[t._v(t._s(t.items.add.province)+"·"+t._s(t.items.add.city)+"·"+t._s(t.items.add.district))]),t._v(" "),n("div",[t._v(t._s(t.items.add.area)+"亩")])]),t._v(" "),n("div",{staticClass:"line"},[n("div",[t._m(0),n("i",[t._v(t._s(t._f("change")(t.items.add.startTime)))])]),t._v(" "),n("div",[t._m(1),n("i",[t._v(t._s(t.items.add.cycle)+"天")])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("i",{staticClass:"icons"},[n("img",{attrs:{src:i(68)}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("i",{staticClass:"icons"},[n("img",{attrs:{src:i(67)}})])}]}},84:function(t,e,i){function n(t){i(58)}var s=i(0)(i(47),i(72),n,null,null);t.exports=s.exports},89:function(t,e,i){function n(t){i(60)}var s=i(0)(i(54),i(74),n,null,null);t.exports=s.exports},9:function(t,e){}},[205]);