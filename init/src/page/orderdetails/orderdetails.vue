<template>
	<div class="page history">
		<wheader title="订单详情"/>
		<div class="scroll content mui-content">

			<div class="corp padding margin" style="background: #FFFFFF;">
				<!--关闭控制-->
				<img src="../../../assets/images/ygb.png" class="lable" v-if="item.status=='已关闭'" />
				<div class="t vux-1px-b">
					<div class="t-l icon-box" :class="filterImg(item.add.corptype)">

					</div>
					<div class="t-r">
						<div><span>{{item.add.corptype}}</span></div>
						<div><span>￥{{item.add.price}}元/亩</span></div>
					</div>
				</div>
				<div class="b">
					<div><span class="icons"><img src="../../../assets/icons/ic_area.png"/></span><span>{{item.add.area}}亩</span></div>
					<div><span class="icons"><img src="../../../assets/icons/ic_date_range_black_24px.png"/></span><span>{{item.add.startTime | change}}</span></div>
					<div><span class="icons"><img src="../../../assets/icons/ic_access_time_black_24px copy 2.png" alt="" /></span><span>{{item.add.cycle}}天</span></div>
				</div>
			</div>
			<div class="contact group padding margin">
				<div class="titles vux-1px-b">
					<span>
						<img src="../../../assets/images/icon/r.png"/>
					</span>
					<span>联系信息</span>
				</div>
				<div class="infos">
					<div>
						<span>{{item.add.name}}</span><span v-if='isSelected(item.fly_teams)'>{{item.add.telphone}}</span><span v-else>{{item.add.telphone}}</span>
					</div>
					<div style="overflow: hidden;">{{item.add.info}}</div>
				</div>
			</div>
			<div class="padding group margin">
				<div class="titles vux-1px-b">
					<span>
						<img src="../../../assets/images/icon/ad.png"/>
						
					</span>
					<span>植保地址</span>
				</div>
				<div class="link">
           <!-- @click="push('./bmapshow.html')" -->
					<span>{{item.add.province}}{{item.add.city}}{{item.add.district}}{{item.add.street}}</span>
					<!-- <span class="icons" style="display: flex;align-items: center;justify-content: flex-end;"><img src="../../../assets/icons/Path 3 Copy 2.png" style="width: 0.08rem;"/></span> -->
				</div>
			</div>

			<div class="padding group margin">
				<div class="titles vux-1px-b">
					<span>
						<img src="../../../assets/images/icon/lits.png"/>
					</span>
					<span>报名列表</span>

				</div>
				<div v-if="inType=='farmers'">
					<div class="apply-item vux-1px-b" v-for="n in item.fly_teams" @click="go(n)">
						<div>
							<span>{{n.name}}</span><span>{{n.enroll_time | change}}</span>
						</div>
						<div class="link">
							<span>{{n.content}}</span>
							<span class="icons" style="display: flex;align-items: center;justify-content: flex-end;"><img src="../../../assets/icons/Path 3 Copy 2.png" style="width: 0.08rem;"/></span>
						</div>
						<div class="gr" v-if="n.selected">
							<img src="../../../assets/images/Group.png" />
						</div>
					</div>

				</div>
				<div v-else class="no-apply">
					<img src="../../../assets/images/Rectangle.png" />
					<span>已有{{item.fly_teams.length}}名飞防队报名</span>
					<img src="../../../assets/images/Rectangle.png" />
				</div>
				<div v-if="item.fly_teams.length==0 && inType=='farmers'" class="no-apply">
					<img src="../../../assets/images/Rectangle.png" />
					<span>暂无飞防队报名</span>
					<img src="../../../assets/images/Rectangle.png" />
				</div>
			</div>
			<div class="padding group margin" v-if="inType!='farmers' && baoming(item.fly_teams)">
				<div class="titles vux-1px-b">
					<span>
						<img src="../../../assets/images/icon/mybm.png"/>
						
					</span>
					<span>我的报名</span>
				</div>
				<div class="link" style="padding-right: 0.15rem;">
					<span>{{user.id,item.fly_teams | content}}</span>
				</div>
			</div>

		</div>
		<div class="button" v-if="item.status!='已关闭'">
			<button class="gb" v-if='inType=="farmers"&&item.status!="已关闭"' @click="UpdateDemandStatus(item._id,'已关闭')">关闭</button>
			<div v-if='inType!="farmers"'>
				<button class="bm" v-if="!baoming(item.fly_teams)" @click="gobaoming('./apply.html')">报名</button>
				<button class="ybm" v-else>已报名</button>
			</div>
		</div>
	</div>
</template>

<script>
import wheader from "@/components/Header";
import {
  AlertModule,
  Alert,
  TransferDomDirective as TransferDom,
  XTextarea
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    wheader,
    Alert,
    XTextarea
  },
  mounted() {
    addUpdate(() => {
      let item = JSON.parse(localStorage.getItem("itemsList"));

      this.SearchDemandOne(item._id);
    });
  },
  beforeCreate() {},
  created() {
    let item = JSON.parse(localStorage.getItem("itemsList"));

    this.SearchDemandOne(item._id);
  },
  filters: {
    content(e, a) {
      for (var i in a) {
        if (e == a[i].id) {
          return a[i].content;
        }
      }
    }
  },
  data() {
    return {
      inType: localStorage.getItem("inType"),
      show2: false,
      info: "",
      item: {
        add: {
          telphone: ""
        },
        fly_teams: []
      },
      user: JSON.parse(localStorage.getItem("user")),
      rel: localStorage.getItem("relStatus")
    };
  },
  methods: {
    baoming(e) {
      //				alert(this.user.id+'userid')
      for (var i in e) {
        //					alert(e[i].id +'id')

        if (e[i].id == this.user.id) {
          //						alert(1)
          return true;
        }
      }
    },
    isSelected(e) {
      //				alert(this.user.id+'userid')
      for (var i in e) {
        //					alert(e[i].id +'id')

        if (e[i].id == this.user.id) {
          //						alert(1)
          return e[i].selected;
        }
      }
    },
    go(e) {
      localStorage.setItem("fly_team_id", e.id);
      localStorage.setItem("fly_team_id_selected", e.selected);
      localStorage.setItem("content", e.content);
      router("./flyteamdetails.html");
    },
    filterImg(e) {
      return filterImg(e);
    },
    gobaoming(e) {
      if (this.rel != 1) {
        mui.toast("请先实名认证");
        return;
      }
      router(e);
    },
    push(e) {
      localStorage.setItem("mapshow", JSON.stringify(this.item.location));
      router(e);
    },
    //列表获取
    SearchDemandOne(id) {
      this.$http
        .get(
          HTTPS +
            "work/Public/demand/?service=Demand.SearchDemandOne&token=" +
            JSON.parse(localStorage.getItem("user")).token +
            "&id=" +
            id,
          {
            timeout: 30000
          }
        )
        .then(
          res => {
            if (res.body.ret == 200) {
              this.item = res.body.data[0];
            } else {
              mui.toast(resMsg(res.body.msg));
            }
          },
          err => {
            mui.toast("网络连接失败");
          }
        );
    },
    //更改状态
    //			待报名/已完成/已关闭|更新需求状态|
    UpdateDemandStatus(id, status) {
      this.$http
        .get(
          HTTPS +
            "work/Public/demand/?service=Demand.UpdateDemandStatus&token=" +
            JSON.parse(localStorage.getItem("user")).token +
            "&id=" +
            id +
            "&status=" +
            status,
          {
            timeout: 30000
          }
        )
        .then(
          res => {
            if (res.body.ret == 200) {
              mui.toast("订单关闭成功");
              update();
              mui.back();
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

<style lang='less'>
.icon-box {
  width: 0.7rem;
  height: 0.7rem;
  background-position: 50% 50%;
  background-size: cover;
  &.dasuan {
    background-image: url("../../assets/icon/_dasuan.png");
  }
  &.default {
    background-image: url("../../assets/icon/_default.png");
  }
  &.ganju {
    background-image: url("../../assets/icon/_ganju.png");
  }
  &.ganzhe {
    background-image: url("../../assets/icon/_ganzhe.png");
  }
  &.mianhua {
    background-image: url("../../assets/icon/_mianhua.png");
  }
  &.putao {
    background-image: url("../../assets/icon/_putao.png");
  }
  &.shuidao {
    background-image: url("../../assets/icon/_shuidao.png");
  }
  &.xiaomai {
    background-image: url("../../assets/icon/_xiaomai.png");
  }
  &.yumi {
    background-image: url("../../assets/icon/_yumi.png");
  }
}
</style>