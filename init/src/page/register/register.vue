<template>
	<div class="page history rephone" id="rephone">
		<wheader title="注册"/>
		<div class="mui-content">
			<!--<winput v-model='model'></winput>-->
			<div class="bx">
				<div class="add-item vux-1px-b" style="">
					<div>*</div>
					<div>姓名</div>
					<div><input type="text" placeholder="请输入姓名" v-model="name" /></div>
				
				</div>
			</div>
			<div class="bx">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>手机</div>
					<div><input type="tel" placeholder="请输入手机号码" v-model="telphone" /></div>
				</div>
			</div>
			<div class="bx ">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>密码</div>
					<div><input type="password" placeholder="请输入密码" name=""  value="" v-model="password" /></div>
					
				</div>
			</div>
			<div class="bx">
				<div class="add-item ">
					<div>*</div>
					<div>确认密码</div>
					<div><input type="password" placeholder="请再次输入密码" name=""  value="" v-model="rpassword" /></div>
					
				</div>
			</div>
			<div class="button">
				<button class="bm" @click="register">提交</button>
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
	 name:'',
	 password:'',
	 rpassword:'',
	 telphone:''
    };
  },
  methods: {
    register() {
      if (this.name == "") {
        mui.toast("请输入姓名");
        return;
      }
      if (this.telphone == "") {
        mui.toast("请输入手机号码");
        return;
	  }
	  if (this.telphone.length != 11) {
        mui.toast("请输入正确手机号码");
        return;
      }
      if (this.password == "") {
        mui.toast("请输入密码");
        return;
	  }
	  if (this.password.length <6) {
        mui.toast("请输入6位及以上密码");
        return;
	  }
	   if (this.rpassword == "") {
        mui.toast("请再次确认密码");
        return;
	  }
	  if (this.rpassword !=this.password ) {
        mui.toast("两次密码输入不一致,请重新输入");
        return;
      }

      this.$http
        .post('http://118.24.101.215:3000/users',{name:this.name,password:this.password,telphone:this.telphone},{ timeout: 30000,emulateJSON: true })
        .then(
          res => {
            if (res.body.ret != 200) {
              mui.toast(resMsg(res.body.msg));
              return;
            }

            mui.toast("注册成功");
            mui.back()
          },
          err => {
            mui.toast("网络连接失败");
          }
        );
    }
  }
};
</script>

<style lang="less">

</style>