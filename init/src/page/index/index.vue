<template>
	<div class="login">
			<h4 @click="push">asdf</h4>
			<div class="form">
				<div><input type="text" placeholder="请输入账号" v-model='username'/></div>
				<div><input type="password" placeholder="请输入密码"  v-model="password"/></div>
				<button type="primary"  @click='login'>登录</button>
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
			 localStorage.setItem('inType', 'farmers')
				// localStorage.setItem('inType', 'flyteam')
		},
		created() {
		},
		methods: {
			push(){
				router('./flyTeam/apply.html')
			},
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
<style lang='scss'>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
  h4 {
    margin-top: 1.4rem;
    font-size: 20px;
  }
  .form {
    position: relative;
    /*margin-bottom:5rem;*/
    width: 100%;
    margin-top: 0rem;
    height: auto;
    button {
      margin-top: 0.8rem;
      width: 3rem;
      height: 0.46rem;
      color: #ffffff;
      background: #5dade2;
      border-radius: 8px;

      border: none;
      font-size: 16px;
    }
    input {
      width: 100%;
      height: 0.4rem;
      border-radius: 5px;
      text-align: left;
      font-size: 16px;
      padding: 0.2rem 0;
      border: none;
      background: none;
    }
    div {
      border-bottom: 1px solid #e5e5e5;
      margin-left: 16px;
      height: 0.8rem;
    }
  }
}
</style>