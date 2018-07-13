
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
				<div class="form">
					<div><span>用户名</span><input type="text" placeholder="请输入账号" v-model='username' class="bt" /></div>

					<div><span class="mm">密码</span><input type="password" placeholder="请输入密码" v-model="password" /></div>
					<p onclick="router('./register.html')">注册</p>
					<div class="buttons">
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
				username:'15528300169',
				password:'123456'
			}
		},

		beforeCreate() {
			//  localStorage.setItem('inType', 'farmers')
				localStorage.setItem('inType', entry)
		},
		created() {
		},
		methods: {
			login() {
				let username=this.username
				let password = this.password
				if(!username){
				 mui.toast('请输入用户名')
					return 
				}
				if(!password){
				 mui.toast('请输入密码')
					return 
				}
				this.$http.post(HTTPS +'/work/Public/mapping/?service=User.login',{username:this.username,password:this.password},{emulateJSON: true}).then((res)=>{
					if(res.body.ret == 200) {
						//登陆过后 存信息
						localStorage.setItem('user', JSON.stringify(res.body.data))
						console.log(localStorage.getItem('user'))
						localStorage.setItem('relStatus', res.body.data.relStatus)
						router('./tabbar.html')
					} else if(res.data.ret == 404) {
						router({
							path: '/phone_binding'
						})
						localStorage.setItem('first', 'true')
					} else {
					 mui.toast('登录失败')
					}
				})
			},
		}
	}
</script>
<style>
*{
box-sizing:content-box; 
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
  margin:0.15rem;
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
  margin-top: 0.29rem;
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

.login .form {
  position: relative;
  /*margin-bottom:5rem;*/
  width: 100%;
  margin-top: 2 0px;
  height: auto;
  background: none;
  height: 250px;
}

.login .form .buttons {
  height: 0.46rem;
  margin-top: 0.3rem;
  border: none;
  /* border-radius: 5px; */
}

.login .form .buttons button {
  width: 100%;
  height: 0.46rem;
  color: #FFFFFF;
  background: #8ec1a0;
  /* border-radius: 5px; */
  border: none;
  font-size: 0.16rem;
  float: left;
  
  margin: 0;
  margin-right: 0.35rem;
}

.login .form div {
  border-bottom: 1px solid #E5E5E5;
  width: 100%;
  height: 0.54rem;
  background: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  line-height: 0.54rem;
}

.login .form div span {
  min-width: 0.5rem;
  text-align: left;
}

.login .form div span.mm {
  letter-spacing: 0.1rem;
}

.login .form div input {
  margin: 0;
  padding: 0;
  margin-left: 0.18rem;
  background: none;
  border: none;
  font-size: 0.14rem !important;
}

.login .form p {
  margin-top: 0.2rem;
  color: #8ec1a0;
  text-align: left;
  font-size: 0.14rem;
  margin-left: 0.2rem;
}
</style>
