<template>
	<div class="home-page page">
    <wheader :back="false"/>
			<scroller :on-refresh="refresh" :on-infinite="infinite" class="scroll">
					<items v-for='(n,index) in item' :key='index' :items='n'></items>
					<load-more :show-loading="showloding" :tip="loding(showloding)" background-color="#fbf9fe"></load-more>
			</scroller>
	</div>
</template>

<script>
import items from "@/components/Items";
import { LoadMore } from "vux";
import wheader from '../../components/Header.vue'
export default {
  data() {
    return {
      item: [],
      inType: localStorage.getItem("inType"),
      page: 1,
      type: "_id",
      event: "up",
      showloding: false,
      ydshow: true
    };
  },
  // 调用vux组件
  components: {
    items,
    LoadMore,
    wheader
  },
  // 创建数据之前
  beforeCreate() {},
  // 创建数据 我们在这里的得到我们在data里面创建的数据,实例已经创建完成之后被调用
  created() {
    // 组件创建完后获取数据
    var callback = function() {};
    //			this.getDemandList(this.type, 1, callback)
    var ydshow = localStorage.getItem("first");
    if (ydshow == undefined || ydshow == null) return;
    console.log(typeof ydshow);
    this.ydshow = ydshow;
  },
  // Dom渲染完成前
  beforeMount() {},
  // Dom渲染完成
  mounted() {
    console.log(localStorage.getItem("user"));
  },
  // 更新视图 在beforeUpdate触发时，视图已经更新完成
  beforeUpdate() {},
  // 更新数据调用的函数、。
  Updated() {},
  watch: {
    type(e) {
      var callback = function() {};
      this.event = "up";
      this.getDemandList(e, 1, callback);
    },
    item(e) {
      console.log(e.length);
    }
  },
  // methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
  methods: {
    first(e) {
      this.ydshow = e;
    },
    loding(e) {
      if (e) {
        return "加载中";
      }
      return "暂无其余数据";
    },
    headerRes(e) {
      let type = null;
      switch (e) {
        case "按距离排序":
          type = "distance";
          break;
        case "按时间排序":
          type = "_id";
          break;
      }
      this.type = type;
    },
    infinite(done) {
      this.event = "down";
      this.getDemandList(this.type, this.page, callback);

      function callback() {
        setTimeout(() => {
          done();
        }, 1000);
      }
    },
    refresh(done) {
      this.event = "up";
      this.page = 1;
      this.getDemandList(this.type, 1, callback);

      function callback() {
        setTimeout(() => {
          done();
        }, 1000);
      }
    },
    getDemandList(type, page, callback) {
      this.$http
        .get(
          HTTPS +
            "work/Public/demand/?service=Demand.DemandList&token=" +
            JSON.parse(localStorage.getItem("user")).token +
            "&order[" +
            type +
            "]=-1" +
            "&page=" +
            page +
            "&point[longitude]=0" +
            "&point[latitude]=0" +
            "&type=" +
            this.inType,
          { timeout: 30000 }
        )
        .then(
          res => {
            let ret = res.body;
            let event = this.event;
            if (ret.ret == 200) {
              if (page == 1) {
                this.item = ret.data.data;
                this.page++;
              } else {
                for (var i in ret.data.data) {
                  this.item.push(ret.data.data[i]);
                }
                if (ret.data.data.length == 0) {
                } else {
                  this.page++;
                }
              }
              callback();
            } else {
              mui.toast(resMsg(res.body.msg));
            }
          },
          err => {
            mui.toast("网络连接失败");
          }
        );
    }
  }
};
</script>

<style>
.loading-layer {
  display: none;
}

.filter {
  filter: blur(5px);
  -webkit-filter: blur(5px);
  /* chrome, opera */
  -ms-filter: blur(5px);
  -moz-filter: blur(5px);
}
.content.scroll {
  flex: 1;
}
.title {
  z-index: 2;
}
.scroll {
  padding-top: 45px;
  z-index: 1;
}
</style>