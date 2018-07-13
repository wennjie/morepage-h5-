<template>
	<div class="page certification addorder history">
		<wheader title="实名认证"/>
		<div class="scroll mui-content">
			<div class="vux-1px-b">
				<div class="bx ">
					<div class="add-item vux-1px-b">
						<div>*</div>
						<div>姓名</div>
						<div>

							<x-input placeholder="请输入姓名" novalidate :show-clear="false" placeholder-align="left" v-model='name'></x-input>
						</div>
						<!--<div>V</div>-->
					</div>
				</div>
				<div class="bx ">
					<div class="add-item">
						<div>*</div>
						<div>证件</div>
						<div>

							<!--<x-input mask="999 9999 9999" v-model="telphone" :max="13" is-type="china-mobile" placeholder='请输入手机号码'></x-input>-->
							<x-input placeholder="请输入身份证号码" novalidate :show-clear="false" placeholder-align="left" v-model="code"></x-input>
						</div>
						<!--<div>V</div>-->
					</div>
				</div>
			</div>
			<div class="certification-info">
				请务必填写您本人的真实身份信息
			</div>
			<div>
				<div class="bx ">
					<div class="add-item vux-1px-b">
						<div>*</div>
						<div>证件照片</div>
					</div>
					<div class="box">
						<div class="up">
							<div>
								<img src="../../../assets/images/身份证背面.png" class="pics" v-if="!imgHeader" />
								<img :src="imgHeader" class="pics" v-else/>
								<imgup name='header' type='card' @res='res'></imgup>

							</div>

							<span>身份证正面</span>
						</div>
						<div class="up">
							<div>
								<img src="../../../assets/images/身份证正面.png" v-if="!imgBack" />
								<img :src="imgBack" class="pics" v-else/>
								<imgup name='back' type='card' @res='res'></imgup>
							</div>
							<span>身份背面</span>
						</div>
						<div class="up">
							<div>
								<img src="../../../assets/images/手持证件.png" v-if="!imgHander" />
								<img :src="imgHander" class="pics" v-else/>
								<imgup name='hander' type='card' @res='res'></imgup>
							</div>
							<span>手持证件</span>
						</div>
					</div>
				</div>

			</div>
			<div class="xy">
				<input type="checkbox" name="" id="" value="" v-model="disabled" />
				<span>同意</span>
				<a >
					<span>《用户协议》</span>
				</a >

			</div>

		</div>
		<div class="button">
			<button class="bm" :disabled="!disabled" :class="{default:!disabled}" @click="relName">提交</button>
		</div>
		<div v-transfer-dom>
			<alert v-model="show2" title="认证完成" content="你已完成实名认证" @on-hide='onHide'></alert>
		</div>
	</div>
</template>

<script>
	import imgup from '@/components/Img_up'
	import { XInput } from 'vux'
	import { AlertModule, Alert, TransferDomDirective as TransferDom } from 'vux'
	import wheader from '@/components/Header'
	export default {
		components: {
			imgup,
			XInput,
			Alert,
			wheader
		},
		directives: {
			TransferDom
		},
		beforeDestroy(){
			this.$vux.loading.hide()
		},
		data() {
			return {
				src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
				data: {},
				disabled: false,
				code: '',
				name: '',
				imgHeader: '',
				imgBack: '',
				imgHander: '',
				user: JSON.parse(localStorage.getItem('user')),
				show2: false

			}
		},
		created() {

		},
		methods: {
			onHide() {
				update()
				mui.back()
			},
			res(e) {
				switch(e.index) {
					case 'header':
						this.imgHeader = e.res + '?imageView2/0/w/207/h/140'
						break;
					case 'back':
						this.imgBack = e.res + '?imageView2/0/w/207/h/140'
						break;
					case 'hander':
						this.imgHander = e.res + '?imageView2/0/w/207/h/140'
						break;
				}
			},
			relName(name, code, imgHeader, imgBack, imgHander) {
				//				
				if(this.name == '') {
					mui.toast('请输入姓名')
					return
				}
				if(this.code == '') {
					mui.toast('请输入身份证号码')
					return
				}
				if(this.code.length != 18) {
					mui.toast('请输入正确身份证号码')
					return
				}
				if(this.imgHeader == '') {
					mui.toast('请上传身份证正面照片')
					return
				}
				if(this.imgBack == '') {
					mui.toast('请上传身份证背面照片')
					return
				}
				if(this.imgHander == '') {
					mui.toast('请上传手持身份证照片')
					return
				}
				this.$http.get(HTTPS + 'work/Public/?service=User.relName&name=' + this.name + '&code=' + this.code + '&imgHeader=' + this.imgHeader + '&imgBack=' + this.imgBack + '&imgHander=' + this.imgHander + '&token=' + this.user.token, {
					timeout: 30000
				}).then((res) => {
					if(res.body.ret == 200) {
						localStorage.setItem('relStatus', 1)
						this.show2 = true
						mui.toast('实名认证成功')

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
<style>
.certification .box .up:first-child{
	padding: 0;
	/* margin-left: 0.24rem; */
}
.certification .box{
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
