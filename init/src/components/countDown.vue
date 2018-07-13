<template>
	<button @click="click" :disabled="disableds" class="count">{{msg}}<span v-if="typeof msg == 'number'">s后重试</span></button>
</template>

<script>
	export default {
		props: {
			telphone: '',

		},
		data() {
			return {
				msg: '获取验证码',
				user: JSON.parse(localStorage.getItem('user')),
				disableds: false
			}
		},
		computed: {
			dis(e) {
				return e
			}
		},
		methods: {
			ok() {},
			click() {
				this.getCode(this.telphone)

			},
			getCode(telphone) {
				this.disableds = true
				this.$http.get(HTTPS + 'work/Public/?service=User.verificationCodeByPhone&telphone=' + telphone + '&token=' + this.user.token,{timeout:30000}).then((res) => {

					if(res.body.ret == 200) {
						this.msg = 59
						let timer = setInterval(() => {
							this.msg--
								if(this.msg == 0) {
									clearInterval(timer)
									this.msg = '获取验证码'
									this.disableds = false
								}
						}, 1000)
						mui.toast('获取验证码成功')
					} else {
						mui.toast(resMsg(res.body.msg))
						this.disableds = false
					}

				}, (err) => {
					this.disableds = false
					mui.toast('网络连接失败')
				})
			}
		}
	}
</script>

<style>
	.count {
		width: 100%;
	}
</style>