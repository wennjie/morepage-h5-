<template>
	<div class="home-page page mine">
    <wheader title="我的" :back="false" :hide='true'/> 
		<div class="mui-content">
			<div class="my-head-portrait vux-1px-b">
				<div class="">
					<img :src="user.headerImg"   v-if="user.headerImg"/>
          <img src="../../assets/icon/_default.png" alt="" v-else>
				</div>
				<div>{{user.name}}</div>
			</div>
			<div>
				<div class="my-items margin" @click="flyTeamDetails('./flyteamdetails.html')" v-if="inType!='farmers'">
					<div class="c">
						<div>我的飞防队</div>
						<div style="display: flex;justify-content: flex-end;align-items: center;"><img src="../../../assets/icons/Path 3 Copy 2.png" style="width: 0.08rem;" /></div>
					</div>
				</div>
        <div class="my-items margin" @click="restart">
					<div class="c">
						<div>{{inType=='farmers' ? '切换到飞防服务':"切换到农田管理"}}</div>
						<div style="display: flex;justify-content: flex-end;align-items: center;"><img src="../../../assets/icons/Path 3 Copy 2.png" style="width: 0.08rem;" /></div>
					</div>
				</div>
				<!-- <div class="my-items" @click="push('./rephone.html')">
					<div class="vux-1px-b c">
						<div>修改手机号</div>
						<div style="display: flex;justify-content: flex-end;align-items: center;"><img src="../../../assets/icons/Path 3 Copy 2.png" style="width: 0.08rem;" /></div>
					</div>
				</div> -->
				<!-- <div class="my-items" @click="push('./certification.html',rel)" v-if="inType!='farmers'">
					<div class="vux-1px-b c">
						<div>实名认证</div>
						<div>
							<span style="color: #ED6262;">{{rel | relStatus}}</span>
						</div>
					</div>
				</div> -->
				<div class="my-items" @click="push('./about.html')">
					<div class="c">
						<div>关于</div>
						<div style="display: flex;justify-content: flex-end;align-items: center;"><img src="../../../assets/icons/Path 3 Copy 2.png" style="width: 0.08rem;" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import wheader from "../../components/Header.vue";
export default {
  components: {
    wheader
  },
  data() {
    return {
      user:JSON.parse(localStorage.getItem("user")),
      rel: localStorage.getItem("relStatus"),
      inType:localStorage.getItem("inType")
    };
  },
  methods: {
    flyTeamDetails(e) {
      if (this.rel != 1) {
        mui.toast("请先实名认证");
        return;
      }
      this.push(e);
    },
    push(e, rel) {
      if (rel == "1") return;
      localStorage.setItem("fly_team_id", this.user.id);
      router(e);
    },
    restart(){
      
      localStorage.setItem('inType',this.inType == 'farmers' ? 'flyteam' : "farmers" )
      restart()
    }
  },
  filters: {
    relStatus(e) {
      switch (e) {
        case "0":
          return "未认证";
          break;
        case "-1":
          return "认证失败";
          break;
        case "1":
          return "已认证";
          break;
      }
    }
  }
};
</script>

<style lang="less">
.mine {
  .mui-content{
    display: flex;
    flex-direction: column;
  }
  .margin {
    margin-bottom: 0.1rem;
  }
  .my-head-portrait {
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.3rem;
    padding-bottom: 0.25rem;
    div:nth-child(1) {
      width: 0.9rem;
      height: 0.9rem;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    div:nth-child(2) {
      margin-top: 0.1rem;
    }
  }
  .my-items {
    background: #ffffff;
    display: flex;
    /*border-bottom: 1px solid #C7C7C7;*/
    position: relative;
    padding-left: 0.15rem;
    .c {
      flex: 1;
      display: flex;
      padding: 0.12rem 0;
      div:nth-child(1) {
        margin-left: 0.05rem;
      }
      div:nth-child(2) {
        flex: 1;
        text-align: right;
        padding-right: 0.24rem;
      }
    }
  }
}
</style>