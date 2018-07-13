<template>
	<div class="auth-code">
		<button @click="click">{{text}}</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: '点击获取验证码'
			}
		},
		methods: {
			click(){
				this.text=30
				let timer=setInterval(()=>{
					this.text--
					
					if(this.text<=0) {
						
						clearInterval(timer)
						this.text='点击获取验证码'
					}
					
				},1000)
			}
		},
		mounted() {

		}
	}
</script>

<style lang="less">

</style>