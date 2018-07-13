<template>
	<div class="page history rephone" id="rephone">
		<wheader title="修改手机"/>
		<div class="mui-content">
			<!--<winput v-model='model'></winput>-->
			<div class="bx">
				<div class="add-item vux-1px-b" style="">
					<div></div>
					<div>原验证码</div>
					<div><input type="number" placeholder="请填写原手机验证码" v-model="code" /></div>
					<div>
						<countDown :telphone='user.telphone'></countDown>
					</div>
				</div>
			</div>
			<div class="bx">
				<div class="add-item vux-1px-b">
					<div></div>
					<div>手机</div>
					<div><input type="tel" placeholder="请填写新手机号码" v-model="telphone" /></div>

					<div></div>
				</div>
			</div>
			<div class="bx ">
				<div class="add-item ">
					<div></div>
					<div>验证码</div>
					<div><input type="number" placeholder="请填写验证码" name="" id="" value="" v-model="newCode" /></div>
					<div>
						<countDown :telphone='telphone'></countDown>
					</div>
				</div>
			</div>
			<div class="button">
				<button class="bm" @click="rePhone">提交</button>
			</div>

		</div>
	</div>
</template>

<script>
import wtextarea from "@/components/textarea";
import countDown from "@/components/countDown";
import wheader from "@/components/Header";

export default {
  components: {
    wtextarea,
    countDown,
    wheader
  },
  data() {
    return {
      time: "",
      info: "",
      user: JSON.parse(localStorage.getItem("user")),
      telphone: "",
      code: "",
      newCode: "",
      btns: "获取验证码",
      btns1: "获取验证码"
    };
  },
  methods: {
    rePhone() {
      if (this.code == "") {
        mui.toast("请输入原手机验证码");
        return;
      }
      if (this.telphone == "") {
        mui.toast("请输入新手机号码");
        return;
      }
      if (this.newCode == "") {
        mui.toast("请输入新手机验证码");
        return;
      }

      this.$http
        .get(
          HTTPS +
            "work/Public/?service=User.setNewTelphone&telphone=" +
            this.telphone +
            "&code=" +
            this.code +
            "&newCode=" +
            this.newCode +
            "&token=" +
            this.user.token,
          { timeout: 30000 }
        )
        .then(
          res => {
            if (res.body.ret != 200) {
              mui.toast(resMsg(res.body.msg));
              return;
            }

            mui.toast("手机号码修改成功");
            update()
            mui.back()
          },
          err => {
            mui.toast("网络连接失败");
          }
        );
    }
  },
  watch: {
    info(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less">
#rephone {
  .bx {
    background: #ffffff;
  }
  .add-item {
    margin-left: 0.12rem;
    padding: 0;
    display: flex;
    height: 0.57rem;
    div {
      line-height: 1.3;
      input {
        padding: 0;
        height: 100%;
        margin: 0;
      }
    }
    div:nth-child(1) {
      color: #e47070;
      line-height: 0.57rem;
      height: 0.2rem;
      width: 0.06rem;
    }
    div:nth-child(2) {
      margin-left: 0.03rem;
      width: 0.7rem;
      /*background: #8EC1A0;*/
      line-height: 0.57rem;
    }
    div:nth-child(3) {
      flex: 1;
      color: #9b9b9b;
      margin: 0;
      /*background: #586C94;*/
      display: flex;
      overflow: hidden;
      input {
        flex: 1;
      }
    }
    div:nth-child(4) {
      font-size: 0.14rem;
      width: 1rem;
      margin-right: 0.14rem;
      color: #9b9b9b;
      /*text-align: right;*/
      display: flex;
      align-items: center;
      justify-content: center;
      /*background: #10AEFF;*/
      button {
        color: #8ec1a0;
        background: none;
        width: 100%;
        /*background: #04BE02;*/
        font-size: 14px;
      }
    }
  }
  .button {
    /*width: 100%;*/
    padding: 0 0.16rem;
    margin-top: 0.4rem;
    /*background: #8EC1A0;*/
    height: 0.47rem;
    border: none;
    color: #ffffff;
    button {
      border-radius: 0.05rem;
    }
  }
}
</style>