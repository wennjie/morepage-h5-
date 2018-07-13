<template>
	<div class="page history apply">
		<wheader title="报名附言"/>	
		<div v-transfer-dom>
			<alert v-model="show2" title="报名成功" content="你已成功报名，请耐心等待" @on-hide='onHide'></alert>
		</div>
		<div class="scroll content textarea mui-content">
			<x-textarea :max="500" placeholder="请填写您的报名附言" v-model='info'></x-textarea>
		</div>

		<div class="button">
			<button class="bm" @click="FlyTeamEnroll(item._id,info)">确认报名</button>

		</div>

	</div>
</template>

<script>
	import { AlertModule, Alert, TransferDomDirective as TransferDom, XTextarea } from 'vux'
	import wheader from '@/components/Header'
	export default {
		directives: {
			TransferDom
		},
		components: {
			wheader,
			Alert,
			XTextarea
		},
		mounted() {

		},
		beforeCreate() {

		},
		created() {

		},
		data() {
			return {
				inType: localStorage.getItem('inType'),
				show2: false,
				item: JSON.parse(localStorage.getItem('itemsList')),
				info: '',

			}
		},
		methods: {
			onHide() {
				mui.back()
			},
			//报名
			FlyTeamEnroll(id, content) {
				//				alert(content.length)

//				this.show2 = true
				this.$http.post(HTTPS + 'work/Public/demand/?service=Demand.FlyTeamEnroll&token=' + JSON.parse(localStorage.getItem('user')).token, {
					id: id,
					content: content
				}, {
					emulateJSON: true,
					timeout:30000
				}).then((res) => {
					if(res.body.ret == 200) {
						this.show2 = true
					} else {
						mui.toast(resMsg(res.body.msg))
					}

				}, (err) => {
					mui.toast('网络连接失败')
				})
			}
		}
	}
</script>

<style lang="less">
	.apply {
		.weui-cell__bd {
			position: relative;
			.weui-textarea-counter {
				position: absolute;
				right: 0.1rem;
				bottom: 0.05rem;
				background: none;
			}
		}
		.textarea {
			textarea {
				border-radius: 0.05rem;
			}
		}
	}
</style>