<template>
	<div class="page history flyteam">
		<wheader title="飞防队信息"/>
		<div class="scroll mui-content">
			<div class="corp padding margin" style="background: #FFFFFF;">
				<div class="t">
					<div class="t-l">
						<div class="">
							<span>{{(list.name).toString()[0]}}</span>
						</div>

					</div>
					<div class="t-r" style="flex: 1;">
						<div><span>{{list.name}}</span></div>
						<div style="margin-right: 0.24rem; color: #666;font-size:0.13rem ;" v-if="inType!='flyteam'">{{content}}</div>
					</div>
				</div>
			</div>

			<div class="contact group padding margin">
				<div class="titles vux-1px-b">
					<span>
						<img src="../../../assets/images/icon/r.png"/>
					</span>
					<span>联系信息</span>
				</div>
				<div class="infos">
					<div>
						<span>{{list.uname}}</span><span>{{list.telphone}}</span>
					</div>
				</div>
			</div>
			<div class="contact group padding margin">
				<div class="titles vux-1px-b">
					<span>
						<img src="../../../assets/images/icon/mybm.png"/>
					</span>
					<span>公司简介</span>
				</div>
				<div class="infos vux-1px-b" v-if="list.info!=''||list.info!=undefined">
					<div style="margin-right: 0.24rem; color: #666666;">
						{{list.info}}
					</div>
				</div>
				<div class="swiper" :class="{'hidet':baseList.length==0}">
					<!--auto-->
					<swiper loop :list="baseList" index="0" @on-index-change="IndexChange" ref='swiper'></swiper>
				</div>
			</div>
			<div class="padding group margin">
				<div class="titles vux-1px-b">
					<span>
						<img src="../../../assets/images/icon/ad.png"/>
						
					</span>
					<span>常驻地址</span>
				</div>
				<div class="link" @click="showmap('./bmapshow.html')">
					<span>{{list.province}}{{list.city}}{{list.district}}{{list.street}}</span>
					<span class="icons" style="display: flex;align-items: center;justify-content: flex-end;"><img src="../../../assets/icons/Path 3 Copy 2.png" style="width: 0.08rem;"/></span>
				</div>
			</div>
		</div>
		<div class="button">
			<div v-if="inType!='flyteam'">
				<button class="lx" @click="call(list.telphone)">电话沟通</button>
				<button class="bm" @click="SelectTeamEnroll(_id,list._id)" v-if="selected=='false'">确认选择</button>
			</div>
			<div v-else>
				<button class="bm" @click="push('./flyteamcompile.html')">编辑</button>
			</div>

		</div>
		<div v-transfer-dom>
			<alert v-model="show2" title="提示" content="该飞防队还未填写资料，请前往填写" @on-hide='onHide'></alert>
		</div>
	</div>
</template>

<script>
	import { Swiper, GroupTitle, SwiperItem, Divider } from 'vux'
	import { AlertModule, Alert, TransferDomDirective as TransferDom } from 'vux'
	import wheader from '../../components/Header.vue'
	export default {
		directives: {
			TransferDom
		},
		components: {
			Swiper,
			SwiperItem,
			GroupTitle,
			Divider,
			Alert,
			wheader
		},
		created() {
			if(this.inType == 'farmers') {
				let item = JSON.parse(localStorage.getItem('itemsList'))
				this._id = item._id
				this.content = localStorage.getItem('content')
			} else {

			}
			this.GetflyTeamById(localStorage.getItem('fly_team_id'))
			let selected = localStorage.getItem('fly_team_id_selected')
			if(selected == null || selected == undefined) {

			} else {
				this.selected = selected
			}

		},
		mounted() {

		},
		methods: {
			onHide() {
				this.push('./flyteamcompile.html')
			},

			IndexChange(index) {
				this.index = index

			},
			swiperImgClick(e) {
				let arr = []
				let _this = this
				for(var i in this.baseList) {
					arr.push(this.baseList[i].img.split('?')[0])
				}
				this.$refs.swiper.$el.addEventListener('click', function() {
					WeixinJSBridge.invoke("imagePreview", {
						"urls": arr,
						"current": arr[_this.index]
					})
				})
			},
			push(e) {
				router(e)
			},
			showmap(e) {
				let center = {
					latitude: this.list.center.lat,
					longitude: this.list.center.lng
				}
				localStorage.setItem('mapshow', JSON.stringify(center))
				this.push(e)
			},
			GetflyTeamById(teamid) {
				this.$http.get(HTTPS + 'work/Public/demand/?service=Demand.GetflyTeamById&token=' + JSON.parse(localStorage.getItem('user'),{timeout:30000}).token + '&teamId=' + teamid).then((res) => {
					if(res.body.ret != 200) {
						mui.toast(resMsg(res.body.msg))
						return
					}
					if(res.body.data.length == 0) {
						this.show2 = true
						return
					}

					this.show2 = false
					this.list = res.body.data[0]
					let imgs = res.body.data[0].imgs
					for(var i in imgs) {
						if(imgs[i].imgres == '' || imgs[i].imgres == '_') {

						} else {
							this.baseList.push({
								url: 'javascript:',
								img: imgs[i].imgres,
								title: ''
							})
						}

					}
					this.swiperImgClick()
				}, (err) => {
					mui.toast('网络连接失败')
				})
			},
			SelectTeamEnroll(id, teamid) {
				this.$http.get(HTTPS + 'work/Public/demand/?service=Demand.SelectTeamEnroll&token=' + JSON.parse(localStorage.getItem('user')).token + '&id=' + id + '&teamId=' + teamid,{timeout:30000}).then((res) => {
					console.log(res)
					if(res.body.ret == 200) {
						mui.toast('选择成功')
						mui.back()
					} else {
						mui.toast(resMsg(res.body.msg))
					}
				}, (err) => {
					mui.toast('网络连接失败')
				})
			},
			call(e) {
				location.href = 'tel:' + e
			}
		},
		data() {
			return {
				baseList: [],
				user: JSON.parse(localStorage.getItem('user')),
				inType: localStorage.getItem('inType'),
				list: {
					name: ''
				},
				show: false,
				content: '',
				_id: '',
				show2: false,
				index: 0,
				selected: false
			}
		}
	}
</script>

<style lang="less">
	.hidet {
		height: 0 !important;
		overflow: hidden;
	}
	
	.flyteam {
		.button {
			div {
				display: flex;
				height: 100%;
				width: 100%;
			}
			.lx {
				background: #666666;
			}
		}
		.t-l {
			background: #8EC1A0;
			display: flex;
			justify-content: center;
			align-items: center;
			span {
				color: #FFFFFF;
				font-size: 0.24rem;
			}
		}
		.t-r {
			div:nth-child(2) {
				color: #666666;
			}
		}
		.corp {}
		.swiper {
			padding-top: 0.1rem;
			margin-right: 0.24rem;
			height: 1.95rem;
			.vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-swiper-desc {
				padding: 0px;
				background: #000000;
				opacity: 0.3;
				height: 0.24rem;
			}
			.vux-slider>.vux-indicator,
			.vux-slider .vux-indicator-right {
				bottom: 0.02rem;
			}
			.vux-slider>.vux-indicator>a>.vux-icon-dot.active,
			.vux-slider .vux-indicator-right>a>.vux-icon-dot.active {
				background-color: #8EC1A0;
			}
		}
	}
</style>