<template>
	<div class="page addorder history">
		<wheader title="新增订单"/>
		<div class="mui-content">
			<!--<winput v-model='model'></winput>-->
			<div class="bx">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>姓名</div>
					<div><input type="text" v-model="add.name" placeholder="请填写联系人称呼" maxlength="8" /></div>
					<div></div>
				</div>
			</div>
			<div class="bx margin">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>手机</div>
					<div><input type="tel" v-model="add.telphone" placeholder="请填写联系人手机号" maxlength="11" /></div>
					<div></div>
				</div>
			</div>
			<div class="bx ">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>作物</div>
					<div><input type="text" v-model="add.corptype" placeholder="请填写或选择作物类型" maxlength="8" /></div>
					<div id="picker">
						<popup-picker :data="list1" @on-change="onChange" ref='picker'>
						</popup-picker>
						<span class="icon"><img src="../../../assets/icons/selected.png" style="width: 0.15rem;"/></span>
					</div>
				</div>
			</div>

			<div class="bx ">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>单价</div>
					<div><input type="number" v-model="add.price" placeholder="请填写单价" maxlength="3" max="999" /></div>
					<div class="infos-text">元/亩</div>
				</div>
			</div>
			<div class="bx ">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>面积</div>
					<div><input type="number" v-model="add.area" placeholder="请填写面积" maxlength="8" max="99999999" /></div>
					<div class="infos-text">亩</div>
				</div>
			</div>
			<div class="bx ">
				<div class="add-item vux-1px-b" @click="showPlugin">
					<div>*</div>
					<div>开始</div>
					<div>
						<span v-if="add.startTime!=''" class="active">{{add.startTime}}</span>
						<span v-else>请选择开始时间</span>
					</div>
					<div style="display: flex;align-items: center;justify-content: flex-end;"><img src="../../../assets/icons/selected.png" style="width: 0.15rem;" /></div>
				</div>
			</div>
			<div class="bx margin">
				<div class="add-item vux-1px-b">
					<div>*</div>
					<div>时长</div>
					<div><input type="number" v-model="add.cycle" placeholder="请填写作业周期" /></div>
					<div class="infos-text">天</div>
				</div>
			</div>
			<div class="bx ">

				<Bmap @res='bmapRes' name='地址'></Bmap>
			</div>

			<div class="textareas textarea">
				<div class="t-info">备注</div>
				<x-textarea :max="500" placeholder="请填写备注信息" v-model="add.info"></x-textarea>
			</div>

		</div>
		<div class="button">
			<button class="bm" @click="addOrder">发布</button>
		</div>
	</div>
</template>

<script>
	import wheader from '@/components/Header'
	import Bmap from '@/components/Bmap'
	import { PopupPicker, Picker,XTextarea} from 'vux'
	export default {
		components: {
			wheader,
			Bmap,
			PopupPicker,
			Picker,
			XTextarea

		},
		data() {
			return {
				time: '',
				info: '',
				year1: '',
				list1: [
					['大蒜', '甘蔗', '柑橘', '棉花', '葡萄', '水稻', '玉米', '小麦']
				],
				add: {
					info: '',
					name: '',
					telphone: '',
					corptype: '',
					price: '',
					area: '',
					cycle: '',
					province: '',
					city: '',
					district: '',
					street: '',
					center: '',
					startTime: '',
				},
				center: {
					longitude: 0,
					latitude: 0
				},
				user: JSON.parse(localStorage.getItem('user'))
			}
		},
		mounted() {
			this.add.telphone = this.user.telphone
			this.$refs.picker.onPopupShow()

		},
		methods: {
			onChange(e) {
				this.add.corptype = e[0]
			},
			bmapRes(e) {
				console.log(e)
				this.center.longitude = e.center.lng
				this.center.latitude = e.center.lat
				this.add.province = e.province
				this.add.city = e.city
				this.add.district = e.district
				this.add.street = e.street
			},
			showPlugin() {
				const _this = this
				this.$vux.datetime.show({
					cancelText: '取消',
					confirmText: '确定',
					format: 'YYYY-MM-DD',
					onConfirm(val) {
						let tody=new Date()
						let YYMMdd=tody.getFullYear()+((tody.getMonth()+1)< 10 ? '-0'+(tody.getMonth()+1): (tody.getMonth()+1)) +'-'+tody.getDate()
						if(new Date(val)<new Date(YYMMdd)){
							mui.toast('开始时间应大于等于今天')
							_this.add.startTime=''
							return 
						}
						_this.add.startTime = val
					}
				})
			},
			addOrder() {
				
				let add = this.add
				if(add.name == '') {
					mui.toast('请输入联系人姓名')
					return
				}
				if(add.telphone == '') {
					mui.toast('请输入联系人手机号')
					return
				}
				if(add.telphone.length != 11) {
					mui.toast('请输入正确手机号')
					return
				}
				if(add.corptype == '') {
					mui.toast('请选择或输入作物类型')
					return
				}
				//				if(add.corptype.length>=8) {
				//					this.$vux.mui.toast.text('作物类型最多8字')
				//					return
				//				}
				if(add.price == '') {
					mui.toast('请输入作物单价')
					return
				}
				if(add.price > 999) {
					mui.toast('作物单价最高为999元/亩')
					return
				}
				if(add.area == '') {
					mui.toast('请输入作业面积')
					return
				}
				if(add.area > 99999999) {
					mui.toast('作业面积最大为99999999亩')
					return
				}
				if(add.startTime == '') {
					mui.toast('请选择开始时间')
					return
				}
				if(add.cycle == '') {
					mui.toast('请输入作业时长')
					return
				}
				if(add.cycle <= 0) {
					mui.toast('作业时长为正整数')
					return
				}
				if(add.cycle > 999) {
					mui.toast('作业时长最多为999天')
					return
				}
				if(add.province == '') {
					mui.toast('定位失败请手动请选择地址')
					return
				}
				if(this.center.longitude == 0) {
					mui.toast('定位数据有误，请刷新后重试')
					return
				}

				this.$http.post(
					HTTPS + 'work/Public/demand/?service=Demand.PublishDemand&token=' + JSON.parse(localStorage.getItem('user')).token, {
						location: this.center,
						add: this.add
					}, {
						emulateJSON: true,
						timeout:30000
					}).then((res) => {

					if(res.body.ret == 200) {
						this.add.name=''
						mui.toast('提交成功')
						update()
						mui.back()
						
					} else {
						mui.toast(resMsg(res.body.msg))
					}
				}, (err) => {
					mui.toast('网络连接失败')
				})
			}
		},
		beforeDestroy(){
			this.$vux.datetime.hide()
		},
		watch: {
			info(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="less">
	.addorder {
		font-size: 0.16rem;
		.bx {
			background: #FFFFFF;
		}
		.infos-text{
			color: #333333 !important; 
			width: 0.5rem !important;
			line-height: 0.57rem !important;
		}
		.add-item {
			margin-left: 0.12rem;
			/*padding: 18px 0;*/
			height: 0.57rem;
			display: flex;
			align-items: center;
			div {
				line-height: 1.3;
			}
			div:nth-child(1) {
				color: #E47070;
				line-height: 0.23rem;
				height: 0.2rem;
				width: 0.06rem;
			}
			div:nth-child(2) {
				margin-left: 0.03rem;
			}
			div:nth-child(3) {
				flex: 1;
				margin-left: 0.2rem;
				color: #9B9B9B;
				height: 100%;
				display: flex;
				align-items: center;
				span{
					padding-left: 17px;
				}
			}
			div:nth-child(4) {
				width: 0.2rem;
				margin-right: 0.25rem;
				color: #9B9B9B;
				text-align: right;
				height: 100%;
			}
			input {
				color: #333333 !important;
				margin: 0;
				border: none;
			}
			#picker {
				position: relative;
				.vux-cell-box {
					overflow: hidden;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				span {
					position: absolute;
					top: 35%;
					left: 35%;
					z-index: 0;
				}
				.weui-cell.vux-tap-active.weui-cell_access {
					padding: 0;
					margin: 0;
					width: 100%;
					height: 100%;
					position: relative;
					z-index: 1;
				}
			}
		}
	}
	.textareas {
		margin-top: 0.1rem;
		background: #fff;
		.weui-textarea-counter {
			width: auto;
			position: absolute;
			background: none;
			right: 0.3rem;
			bottom: 0.1rem;
			color: #D1D1D6;
		}
		.weui-cell:before {
			height: 0;
			border-top: none;
		}
		.t-info {
			padding-left: 0.24rem;
			font-size:0.16rem ;
			padding-top:0.18rem ;
		}
		.weui-cell {
			padding: 0.1rem 0.24rem;
			padding-top: 0.05rem;
		}
		.weui-cell__bd{
			border: 1px solid #999999;
			border-radius:0.05rem ;
		}
		textarea{
			height: 1.02rem;
			border-radius:0.05rem ;
			border: none;
			/*border:1px solid #999999 ;*/
			font-size:0.16rem ;
			margin: 0 !important;
			/*border: none;*/
		}
		textarea::-webkit-input-placeholder {
			/* WebKit browsers */
			color: #D1D1D6;
		}
		textarea:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #D1D1D6;
		}
		textarea::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #D1D1D6;
		}
		textarea::-ms-input-placeholder {
			/* Internet Explorer 10+ */
			color: #D1D1D6;
		}
		
	}
	.mui-content{
		padding-bottom: 0.6rem;
	}
	.button{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 0.5rem !important;
		}
</style>