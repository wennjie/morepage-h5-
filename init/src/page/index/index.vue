
<template>
	<div id="app" class="login">
			<div class="content">
				<!-- <div class="img">
					<img src="../assets/Group 3.png" />
				</div> -->
				<div class="info">
					<p>欢迎使用</p>
					<p>植保需求平台</p>
				</div>
				<div class="froms">
					<div class="line"><span>电话号</span><input type="text" placeholder="请输入账号" v-model='post.username' class="bt" /></div>
					<div class="line"><span class="mm">密码</span><input type="password" placeholder="请输入密码" v-model="post.password" /></div>
          <div class="line-q">
            <span>登录切换</span>
            <el-switch
              v-model="radio"
              active-text="飞防服务"
              inactive-text="农田管理"
              active-value="flyteam"
              inactive-value="farmers"
              active-color='#8ec1a0'
              >
            </el-switch>
            
          </div>
					<div class="infos">
            <span class="span">
               <el-checkbox v-model="checked" fill='#8ec1a0'>记住密码</el-checkbox>
            </span>
            <span class="span">
               <p onclick="router('./register.html')">注册</p>
            </span>
          </div>
					<div class="buttons" >
						<button type="primary" @click="login()">登录</button>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
export default {
  data() {
    return {
      post:{
        username: "",
        password: "",
      },
      radio: localStorage.getItem('inType') || "farmers",
      checked:true
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if(userInfo){
      this.post=userInfo
    }
  },
  methods: {
    login() {
      let {username,password }= this.post;
      if (!username) {
        mui.toast("请输入用户名");
        return;
      }
      if (!password) {
        mui.toast("请输入密码");
        return;
      }
      localStorage.setItem("inType", this.radio);
      this.$http
        .post(
          HTTPS + "/work/Public/mapping/?service=User.login",
          this.post,
          { emulateJSON: true }
        )
        .then(res => {
          if (res.body.ret == 200) {
            //登陆过后 存信息
            localStorage.setItem("user", JSON.stringify(res.body.data));
            if(this.checked){
              localStorage.setItem('userInfo',JSON.stringify(this.post))
            }else{
              localStorage.removeItem('userInfo')
            }
            localStorage.setItem("relStatus", res.body.data.relStatus);
            router("./tabbar.html");
          } else if (res.data.ret == 404) {
            // router({
            //   path: "/phone_binding"
            // });
            // localStorage.setItem("first", "true");
             mui.toast("未知错误");
          } else {
            mui.toast("登录失败");
          }
        });
    }
  }
};
</script>
<style lang='less'>
* {
  box-sizing: content-box;
}
.el-switch {
  margin-left: 0.2rem;
}
.el-switch__label.is-active {
  color: #8ec1a0;
}
.el-checkbox__input.is-checked .el-checkbox__inner{
      background-color: #8ec1a0;
    border-color: #8ec1a0;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color: #8ec1a0;
}
.login .infos{
  display: flex;
  margin-top: 0.2rem;
   .span{
    display: flex;
    align-items: center;
    p{
      margin: 0;
    }
    &:nth-child(1){
      flex: 1;
    }
  }
  
}
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 0.14rem;
}

.login .content {
  margin: 0.15rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login .img {
  text-align: left;
  width: 0.68rem;
  height: 0.5rem;
  margin-top: 0.68rem;
}

.login .img img {
  float: left;
  width: 100%;
}

.login .info {
  display: flex;
  margin-top: 0rem;
  font-size: 0.31rem;
  margin-bottom: 0.18rem;
 
}

.login .info p {
  font-size: 0.31rem;
  color: #000000;
}

.login .info p:nth-child(2) {
  color: #999;
  margin-left: 0.18rem;
}

.login .froms {
  position: relative;
  /*margin-bottom:5rem;*/
  width: 100%;
  margin-top: 2 0px;
  height: auto;
  background: none;
  height: 320px;
}

.login .froms .buttons {
      padding: 0 .16rem;
    margin-top: .4rem;
    height: .4rem;
    border: none;
    color: #fff;
}

.login .froms .buttons button {
  width: 93%;
  height: 0.4rem;
  color: #ffffff;
  background: #8ec1a0;
  /* border-radius: 5px; */
  border: none;
  font-size: 0.16rem;
  float: left;

  margin: 0;
  margin-right: 0.35rem;
}

.login .froms .line {
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  height: 0.54rem;
  background: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  line-height: 0.54rem;
}

.login .froms div.line span {
  min-width: 0.5rem;
  text-align: left;
}

.login .froms div.line span.mm {
  letter-spacing: 0.1rem;
}

.login .froms div.line input {
  margin: 0;
  padding: 0;
  margin-left: 0.18rem;
  background: none;
  border: none;
  font-size: 0.14rem !important;
}

.login .froms p {
  margin-top: 0.2rem;
  color: #8ec1a0;
  text-align: left;
  font-size: 0.14rem;
  margin-left: 0.2rem;
}
.froms {
  .line-q {
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    height: 0.54rem;
    background: none;
    overflow: hidden;
    display: flex;
    align-items: center;
    line-height: 0.54rem;
    .el-radio {
      margin: 0;
      margin-left: 20px;
      .el-radio__label {
        padding: 0;
        padding-left: 5px;
      }
    }
  }
}
</style>
