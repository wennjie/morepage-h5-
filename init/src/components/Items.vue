<template>
	<div class="items" @click='push(items._id)'>
		<div v-if="!farmers&&items.fly_teams.length!=0&&showlable(items.fly_teams)">
			<img src="../assets/images/yxz.png" class="lable" v-if="show(items.fly_teams)" />
			<img src="../assets/images/ybm.png" class="lable" v-else/>
		</div>
		<div class="logo">
			<div class="icon-box" :class="filterImg(items.add.corptype)">
			</div>
		</div>
		<div class="lits">
			<div class="line">
				<div>{{items.add.corptype}}</div>
				<div><span>￥{{items.add.price}}元</span>/亩</div>
			</div>
			<div class="line">
				<div>{{items.add.province}}·{{items.add.city}}·{{items.add.district}}</div>
				<div>{{items.add.area}}亩</div>
			</div>
			<div class="line">
				<div><i class="icons"><img src="../assets/icons/ic_date_range_black_24px.png"/></i><i>{{items.add.startTime | change }}</i></div>
				<div><i class="icons"><img src="../assets/icons/ic_access_time_black_24px copy 2.png"/></i><i>{{items.add.cycle}}天</i></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      farmers: true,
      user: JSON.parse(localStorage.getItem("user"))
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
    show(e) {
      for (var i in e) {
        if (e[i].id == this.user.id) {
          return e[i].selected;
        }
      }
    },
    showlable(e) {
      for (var i in e) {
        if (e[i].id == this.user.id) {
          return true;
        }
      }
    },
    push(id) {
      localStorage.setItem("itemsList", JSON.stringify(this.items));
      router("./orderdetails.html");
    },
    filterImg(e) {
      return filterImg(e);
    }
  },
  computed: {},
  filters: {
    //			change(e){
    //				return
    //			}
  }
};
</script>

<style lang="less">
.icon-box {
  width: 0.7rem;
  height: 0.7rem;
  background-position: 50% 50%;
  background-size: cover;
  &.dasuan {
    background-image: url("../assets/icon/_dasuan.png");
  }
  &.default {
    background-image: url("../assets/icon/_default.png");
  }
  &.ganju {
    background-image: url("../assets/icon/_ganju.png");
  }
  &.ganzhe {
    background-image: url("../assets/icon/_ganzhe.png");
  }
  &.mianhua {
    background-image: url("../assets/icon/_mianhua.png");
  }
  &.putao {
    background-image: url("../assets/icon/_putao.png");
  }
  &.shuidao {
    background-image: url("../assets/icon/_shuidao.png");
  }
  &.xiaomai {
    background-image: url("../assets/icon/_xiaomai.png");
  }
  &.yumi {
    background-image: url("../assets/icon/_yumi.png");
  }
}
.lits {
  .line:nth-child(2) {
    div:nth-child(1) {
      width: 160px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>