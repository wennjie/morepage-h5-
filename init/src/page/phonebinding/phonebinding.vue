<template>
	<div class="page history rephone" id="rephone">
		<div class="scroll">
			<!--<winput v-model='model'></winput>-->
			<div class="bx">
				<div class="add-item vux-1px-b">
					<div></div>
					<div>手机</div>
					<div><input type="tel" v-model="telphone" placeholder="请填写手机号码" /></div>
					<div></div>
				</div>
			</div>
			<div class="bx ">
				<div class="add-item ">
					<div></div>
					<div>验证码</div>
					<div><input type="" placeholder="请填写验证码" v-model="code" /></div>
					<div>
						<countDown :telphone='telphone'></countDown>
					</div>
				</div>
			</div>
			<div class="button">
				<button class="bm" @click="bingingPhone">提交</button>
			</div>

		</div>
	</div>
</template>

<script>
	import winput from '@/components/input'
	import countDown from '@/components/countDown'
	export default {
		components: {
			winput,
			countDown
		},
		data() {
			return {
				time: '',
				telphone: '',
				code: '',
				user: JSON.parse(localStorage.getItem('user'))
			}
		},
		methods: {
			bingingPhone() {
				if(this.telphone == '') {
					mui.toast('请输入手机号')
					return
				}
				if(this.code == '') {
					mui.toast('请输入验证码')
					return
				}
				//				if(^[0-9]*$.test(this.code)){
				//					this.$vux.mui.toast.text('请输入正确验证码')
				//					return
				//				}
				try {
					this.$http.get(HTTPS + 'work/Public/?service=User.loginWithWechat&wechatId=' + this.user.unionid + '&wechatCode=' + this.user.code + '&telphoneCode=' + this.code + '&telphone=' + this.telphone,{timeout:30000}).then((res) => {

						if(res.body.ret == 200) {
							mui.toast('手机号码绑定成功')
							mui.back()

						} else {
							mui.toast(resMsg(res.body.msg))
						}

					}, (err) => {
						mui.toast('网络连接失败')
					})
				} catch(e) {
					alert(e)
				}

			}
		},
		watch: {

		}
	}
</script>

<style lang="less">
	#rephone {}
</style>